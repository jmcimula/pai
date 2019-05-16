export type ConverterFunction = (args: string[]) => string;

export class JobSubmitter
{
  private readonly _jobConverter: ConverterFunction;
  private readonly _convertArgs: string[];

  constructor(converterFunc: ConverterFunction, ...restArgs: string[]) {
    this._jobConverter = converterFunc;
    this._convertArgs = restArgs;
  }

  public submitJob() {
    const yamlContent = this._jobConverter(this._convertArgs);
    // check permission
    // valid yaml content here
    // sbumit the job
    alert("submit job successfullly");
  }
}