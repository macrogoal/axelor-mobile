/*
 * @Author: macrogoal macrogoal@sina.com
 * @Date: 2025-01-21 17:26:13
 * @LastEditors: macrogoal macrogoal@sina.com
 * @LastEditTime: 2025-09-16 19:03:02
 * @FilePath: \axelor-mobile\packages\core\src\i18n\i18n.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2025 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import i18next, {i18n} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {formatResources} from './helpers/langages';

export interface resourcesBinding {
  lng: string;
  translationsObject: any;
}

export interface langagesResources {
  resources: resourcesBinding[];
  defaultLanguage: string;
}

class I18nProvider {
  private resources: any;
  private i18next: i18n;

  constructor() {
    this.resources = [];
    this.i18next = i18next;
  }

  get i18n() {
    return this.i18next;
  }

  configI18n({resources, defaultLanguage}: langagesResources) {
    this.resources = formatResources({resources});
    this.initI18n(defaultLanguage);
  }

  initI18n = defaultLanguage => {
    this.i18next.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      lng: defaultLanguage,
      fallbackLng: 'en',
      resources: this.resources,
      react: {
        bindI18nStore: 'added',
      },
    });
  };
}

export const i18nProvider = new I18nProvider();

export const configI18n = ({
  resources,
  defaultLanguage = 'zh',
}: langagesResources) => i18nProvider.configI18n({resources, defaultLanguage});
