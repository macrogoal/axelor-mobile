/**
 * Copyright (c) 2025-2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony';
import { createRNOHPackages as createRNOHPackagesAutolinking } from "./RNOHPackagesFactory"

export function getRNOHPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    ...createRNOHPackagesAutolinking(ctx)
  ]
}
