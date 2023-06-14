import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;
}
