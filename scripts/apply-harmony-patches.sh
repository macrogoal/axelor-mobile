#!/usr/bin/env bash
# Apply HarmonyOS compatibility patches for RNOH 0.82.34 + HarmonyOS 7.0
# This script is called from package.json postinstall to persist fixes
# that cannot be handled by patch-package (yarn 4 incompatibility).
#
# Patches applied:
#   1. Autolinking.js: RNOHPackage[] → RNPackage[] (ArkTS type fix)
#   2. SystraceSection.h: empty stub (header removed in RN 0.82)
#   3. C++ class name aliases for gesture-handler and screens
#
# Usage: bash scripts/apply-harmony-patches.sh
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[harmony-patches] Applying RNOH 0.82.34 + HarmonyOS 7.0 compatibility patches..."

# ─── Patch 1: Autolinking.js — RNOHPackage[] → RNPackage[] ──────────────
# The autolink template hardcodes RNOHPackage[] as the return type of
# createRNOHPackages(). tpl packages like gesture-handler inherit RNPackage
# (not RNOHPackage), causing ArkTS error 10505001. Changing to RNPackage[]
# is safe because RNOHPackage extends RNPackage (polymorphism).
AUTO_LINKING="$PROJECT_ROOT/node_modules/@react-native-oh/react-native-harmony-cli/dist/autolinking/Autolinking.js"

if [ -f "$AUTO_LINKING" ]; then
  if grep -q "RNOHPackage\[\]" "$AUTO_LINKING" 2>/dev/null; then
    sed -i 's/import type { RNPackageContext, RNOHPackage }/import type { RNPackageContext, RNPackage }/' "$AUTO_LINKING"
    sed -i 's/export function createRNOHPackages(ctx: RNPackageContext): RNOHPackage\[\]/export function createRNOHPackages(ctx: RNPackageContext): RNPackage[]/' "$AUTO_LINKING"
    echo "[harmony-patches] ✓ Patch 1: Autolinking.js RNOHPackage[] → RNPackage[]"
  else
    echo "[harmony-patches] ✓ Patch 1: Autolinking.js already patched (skip)"
  fi
else
  echo "[harmony-patches] ⚠ Patch 1: Autolinking.js not found (skip)"
fi

# ─── Patch 2: SystraceSection.h — empty stub ────────────────────────────
# react/renderer/debug/SystraceSection.h was removed in newer React Native
# versions bundled with RNOH 0.82.34, but gesture-handler's C++ code still
# references it. We create a minimal stub with an empty RAII class.
RNOH_CPP_DIR="$PROJECT_ROOT/harmony/oh_modules/@rnoh/react-native-openharmony/src/main/cpp"
SYSTRACE_DIR="$RNOH_CPP_DIR/react/renderer/debug"
SYSTRACE_FILE="$SYSTRACE_DIR/SystraceSection.h"

if [ -d "$RNOH_CPP_DIR" ]; then
  if [ ! -f "$SYSTRACE_FILE" ]; then
    mkdir -p "$SYSTRACE_DIR"
    cat > "$SYSTRACE_FILE" << 'HEREDOC'
#pragma once
#include <string>
namespace facebook { namespace react {
class SystraceSection {
public:
  explicit SystraceSection(const char* name, ...) {}
  explicit SystraceSection(const std::string& name, ...) {}
};
}} // namespace facebook::react
HEREDOC
    echo "[harmony-patches] ✓ Patch 2: SystraceSection.h stub created"
  else
    echo "[harmony-patches] ✓ Patch 2: SystraceSection.h already exists (skip)"
  fi
else
  echo "[harmony-patches] ⚠ Patch 2: oh_modules not found (skip — run after ohpm install)"
fi

# ─── Patch 3: C++ class name aliases ────────────────────────────────────
# autolink generates class names from npm package names (e.g.
# ReactNativeOhTplReactNativeGestureHandlerPackage), but the actual C++
# classes in the .har files use different names (e.g.
# RnohReactNativeHarmonyGestureHandlerPackage). We create alias headers
# to bridge the naming mismatch.

# gesture-handler alias
GH_CPP_DIR="$PROJECT_ROOT/harmony/oh_modules/@react-native-oh-tpl/react-native-gesture-handler/src/main/cpp"
GH_ALIAS="$GH_CPP_DIR/ReactNativeOhTplReactNativeGestureHandlerPackage.h"

if [ -d "$GH_CPP_DIR" ]; then
  if [ ! -f "$GH_ALIAS" ]; then
    cat > "$GH_ALIAS" << 'HEREDOC'
#pragma once
#include "RnohReactNativeHarmonyGestureHandlerPackage.h"
namespace rnoh {
using ReactNativeOhTplReactNativeGestureHandlerPackage = RnohReactNativeHarmonyGestureHandlerPackage;
}
HEREDOC
    echo "[harmony-patches] ✓ Patch 3a: gesture-handler C++ alias created"
  else
    echo "[harmony-patches] ✓ Patch 3a: gesture-handler C++ alias already exists (skip)"
  fi
else
  echo "[harmony-patches] ⚠ Patch 3a: gesture-handler oh_modules not found (skip)"
fi

# screens alias
SC_CPP_DIR="$PROJECT_ROOT/harmony/oh_modules/@react-native-oh-tpl/react-native-screens/src/main/cpp"
SC_ALIAS="$SC_CPP_DIR/ReactNativeOhTplReactNativeScreensPackage.h"

if [ -d "$SC_CPP_DIR" ]; then
  if [ ! -f "$SC_ALIAS" ]; then
    cat > "$SC_ALIAS" << 'HEREDOC'
#pragma once
#include "RnohReactNativeHarmonyScreensPackage.h"
namespace rnoh {
using ReactNativeOhTplReactNativeScreensPackage = RnohReactNativeHarmonyScreensPackage;
}
HEREDOC
    echo "[harmony-patches] ✓ Patch 3b: screens C++ alias created"
  else
    echo "[harmony-patches] ✓ Patch 3b: screens C++ alias already exists (skip)"
  fi
else
  echo "[harmony-patches] ⚠ Patch 3b: screens oh_modules not found (skip)"
fi

echo "[harmony-patches] Done."
