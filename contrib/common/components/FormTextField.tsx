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
import { Stack, Label, Link, ITextFieldProps, TextField } from 'office-ui-fabric-react';

interface IFormTextFieldProps
{
  label?: string;
  required?: boolean;
  labelRender?: ILableRender;
  multiline?: boolean;
  rows?: number;
  prefix?: string;
  defaultValue?: string;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  value?: string;
}

interface ILableRender
{
  onRenderLable (props: IFormTextFieldProps | undefined): JSX.Element;
}

export class LabelHrefRender implements ILableRender
{
  private constructor(
    private readonly text: string,
    private readonly hrefLink: string
  ) {}

  public static creatLableHrefRender(text: string, hrefLink: string): LabelHrefRender {
    return new LabelHrefRender(text, hrefLink);
  }

  public onRenderLable(props: IFormTextFieldProps): JSX.Element {
    const labelRender = props.labelRender as LabelHrefRender;
    return (
      <Stack horizontal verticalAlign="center">
        <Label required={props.required}>{props.label}</Label>
        <Link href={labelRender.hrefLink}>{labelRender.text}</Link>
      </Stack>
    );
  }
}

export const FormTextField = (props: IFormTextFieldProps) => {
  let textFiled = props as ITextFieldProps;
  if (props.labelRender !== undefined) {
    const propsWithRender = {...textFiled, onRenderLabel: props.labelRender.onRenderLable};
    return <TextField {...propsWithRender}></TextField>
  }
  return (
    <TextField {...textFiled}></TextField>
  );
}