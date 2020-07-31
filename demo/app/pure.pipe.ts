import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pure',
})
export class PurePipe<T, TContext, TResult> implements PipeTransform {
  transform(
    value: T,
    mapper: (arg: T, context?: TContext) => TResult,
    context?: TContext,
  ) {
    return mapper(value, context);
  }
}
