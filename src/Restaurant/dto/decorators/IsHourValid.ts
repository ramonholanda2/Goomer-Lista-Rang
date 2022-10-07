import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsHourValid(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsHourValid",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return true;
          if (value.length > 5) return false;

          const hours = Number(value.substring(0, 2));
          const split = value.substring(2, 3);
          const minutes = Number(value.substring(3, 5));

          if ((!hours && hours !== 0) || (!minutes && minutes !== 0) || split !== ":") return false;

          if (hours > 23 || minutes > 59) return false;

          return true;
        },
      },
    });
  };
}
