import { Control, FieldError } from 'react-hook-form';


export type InputControllerProps = InputProps &{
    control: Control<any>;
    name: string;
    error?: FieldError 
}