import { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { picker } from '@ohos.file.picker';
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';

const MIME_MAP: [string, string[]][] = [
  ['application/pdf', ['.pdf']],
  ['application/msword', ['.doc']],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', ['.docx']],
  ['application/vnd.ms-excel', ['.xls']],
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ['.xlsx']],
  ['image/png', ['.png']],
  ['image/jpeg', ['.jpg', '.jpeg']],
  ['image/gif', ['.gif']],
  ['image/webp', ['.webp']],
  ['text/plain', ['.txt']],
  ['text/csv', ['.csv']],
  ['application/json', ['.json']],
];

function mimeToExtensions(mime: string): string[] {
  const found = MIME_MAP.find(([key]) => key === mime);
  return found ? found[1] : [];
}

function extensionToMime(ext: string): string {
  const lower = ext.toLowerCase();
  const found = MIME_MAP.find(([, exts]) => exts.includes(lower.startsWith('.') ? lower : `.${lower}`));
  return found ? found[0] : 'application/octet-stream';
}

export class DocumentPickerTurboModule extends TurboModule {
  constructor(ctx: TurboModuleContext) {
    super(ctx);
  }

  pick(options: Object): Promise<Object[]> {
    return new Promise((resolve, reject) => {
      try {
        const opts = options as Record<string, any>;
        const docPicker = new picker.DocumentViewPicker(this.ctx.uiAbilityContext);
        const selectOptions = new picker.DocumentSelectOptions();

        if (opts.allowMultiSelection === true) {
          selectOptions.maxSelectCount = 0;
        } else {
          selectOptions.maxSelectCount = 1;
        }

        if (Array.isArray(opts.type) && opts.type.length > 0) {
          const extensions: string[] = [];
          for (const t of opts.type) {
            if (typeof t === 'string') {
              const exts = mimeToExtensions(t);
              if (exts.length > 0) {
                extensions.push(...exts);
              }
            }
          }
          if (extensions.length > 0) {
            selectOptions.fileSuffixFilters = extensions;
          }
        }

        docPicker.select(selectOptions).then((uris: string[]) => {
          const results: Object[] = [];
          for (const uri of uris) {
            try {
              const stat = fs.statSync(uri);
              const name = uri.split('/').pop() || 'unknown';
              const type = extensionToMime(name.includes('.') ? name.split('.').pop()! : '');
              results.push({
                uri: uri,
                name: name,
                error: null,
                type: type,
                nativeType: type,
                size: stat.size,
                isVirtual: false,
                convertibleToMimeTypes: null,
                hasRequestedType: true,
              });
            } catch (statErr) {
              results.push({
                uri: uri,
                name: uri.split('/').pop() || null,
                error: statErr instanceof BusinessError ? statErr.message : String(statErr),
                type: null,
                nativeType: null,
                size: null,
                isVirtual: null,
                convertibleToMimeTypes: null,
                hasRequestedType: true,
              });
            }
          }
          resolve(results);
        }).catch((err: BusinessError) => {
          if (err.code === 13900015) {
            reject(new Error('User canceled'));
          } else {
            reject(err);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  saveDocument(options: Object): Promise<Object> {
    return Promise.reject(new Error('Not supported on HarmonyOS'));
  }

  writeDocuments(options: Object): Promise<Object[]> {
    return Promise.reject(new Error('Not supported on HarmonyOS'));
  }

  pickDirectory(options: Object): Promise<Object> {
    return Promise.reject(new Error('Not supported on HarmonyOS'));
  }

  keepLocalCopy(options: Object): Promise<Object[]> {
    return Promise.reject(new Error('Not supported on HarmonyOS'));
  }

  isKnownType(kind: string, value: string): Object {
    if (kind === 'mimeType') {
      const exts = mimeToExtensions(value);
      return { isKnown: exts.length > 0 };
    }
    return { isKnown: false };
  }

  releaseSecureAccess(uris: string[]): Promise<null> {
    return Promise.resolve(null);
  }

  releaseLongTermAccess(uris: string[]): Promise<Object> {
    return Promise.resolve({});
  }

  addListener(eventName: string): void {}

  removeListeners(count: number): void {}
}
