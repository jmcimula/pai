/*!
 * Copyright (c) Microsoft Corporation
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { IColumn, DetailsList, CheckboxVisibility, DetailsListLayoutMode } from 'office-ui-fabric-react';
import React from 'react';

interface IFormDetailsListProps {
  items: any[];
  columns?: IColumn[];
}

export function createDefaultFormColumn(key: string, name: string, fieldName: string) {
  return createCustomizedFormColumn(key, name, fieldName, 100, 200, true);
}

export function createFormColumnWithRender(key: string, name: string, fieldName: string, onRender: (item?: any, index?: number, column?: IColumn) => any) {
  return createCustomizedFormColumn(key, name, fieldName, 100, 200, true, onRender);
}

export function createCustomizedFormColumn(key: string, name: string, fieldName: string, minWidth: number,
                                           maxWidth: number, isResizable: boolean, onRender?: (item?: any, index?: number, column?: IColumn) => any) : IColumn{
  const column : IColumn = { key: key,
                             name: name,
                             fieldName: fieldName,
                             minWidth: minWidth,
                             maxWidth: maxWidth,
                             isResizable: isResizable,
                             onRender: onRender };
  return column;
}

export const FormDetailList = (props: IFormDetailsListProps) => {
  return (
    <DetailsList {...props} checkboxVisibility={CheckboxVisibility.hidden} layoutMode={DetailsListLayoutMode.fixedColumns}/>
  );
}