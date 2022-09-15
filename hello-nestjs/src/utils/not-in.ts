import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function NotIn(property: string, validationOptions?: ValidationOptions) {
  // decorator는 인자로 참조하려고하는 다른속성의 이름과 ValidationOptions를 받는다.
  return (object: Object, propertyName: string) => {
    // registerDecorator를 호출하는 함수를 리턴, 데코레이터가 선언될 객체와 속성 이름을 받음
    registerDecorator({
      name: 'NotIn',
      // name of decorator
      target: object.constructor,
      // 생성자에 적용되어 객체가 생성될 떄 적용됨
      propertyName,
      options: validationOptions,
      constraints: [property],
      // 특정 속성에만 적용되도록 하는 제약
      validator: {
        // 유효성 검사 규칙
        validate(value: any, args: ValidationArguments) {
          // ValidatorConstraintInterface를 구현한 함수임
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            !relatedValue.includes(value)
          );
        },
      },
    });
  };
}
