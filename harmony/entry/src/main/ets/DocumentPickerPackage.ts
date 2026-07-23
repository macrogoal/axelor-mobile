import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { DocumentPickerTurboModule } from './DocumentPickerTurboModule';

class DocumentPickerTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === 'RNDocumentPicker') {
      return new DocumentPickerTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === 'RNDocumentPicker';
  }
}

export class DocumentPickerPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new DocumentPickerTurboModulesFactory(ctx);
  }
}
