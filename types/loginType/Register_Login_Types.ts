export interface UserRegisterType extends Omit<RecordUserType,'id'> {
    id?: string;
}

export interface RecordUserType{
    id: string;
    email: string;
    password: string
}
