import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { verifyDaysWeek } from '../../../util/daysWeek';

export function VerifyDaysWeek(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'VerifyDaysWeek',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string[], args: ValidationArguments) {
            if(Array.isArray(value)) {
                return verifyDaysWeek(value)
            }
            return true
        },
      },
    });
  };
}