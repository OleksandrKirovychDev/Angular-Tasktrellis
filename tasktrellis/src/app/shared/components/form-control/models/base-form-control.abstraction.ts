import { IFormControlTooltip } from '../types/form-control-tooltip.type';

export abstract class BaseFormControlAbstraction {
  label!: string;
  error!: string | null;
  hasError!: boolean;
  isDisabled!: boolean;
  isTransparent?: boolean;
  tooltip?: IFormControlTooltip;
  description?: string;
}
