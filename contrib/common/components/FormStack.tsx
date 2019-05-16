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
import React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { Style } from '../styles/styles';

interface IStackProps
{
  gap?: number;
  children: object;
  reversed?: boolean;
}

export const FormStack: React.FunctionComponent = (props) => {
  return (
    <Stack gap={20} padding={20} horizontalAlign="center" className={Style.form}>
      {props.children}
    </Stack>
  );
};

export const FormHorizonStask = (props: IStackProps) => {
  const stackProps: IStackProps = {...props};
  return (
    <Stack horizontal {...stackProps}>
      {props.children}
    </Stack>
  );
}

export const FormBasicStack = (props: IStackProps) => {
  const stackProps: IStackProps = {...props};
  return (
    <Stack {...stackProps}>{ props.children }</Stack>
  );
}
