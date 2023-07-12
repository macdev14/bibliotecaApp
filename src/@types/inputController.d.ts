export type InputControllerProps = InputProps &{
    control: Control<any>;
    name: string;
    error?: FieldError 
}