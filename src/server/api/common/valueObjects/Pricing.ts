import { trimString } from '../helperMethods/stringHelpers'
import Result from '../result'

export class Pricing {
  public Name: string
  public Price: string

  private constructor(name: string, price: string) {
    this.Name = name
    this.Price = price
  }

  static TryCreate(name: string, price: string): Result<Pricing> {
    const computedPrice = parseFloat(price)
    if (isNaN(computedPrice) || !isFinite(computedPrice)) {
      return Result.Failure('Invalid price')
    }

    if (computedPrice <= 0) {
      return Result.Failure('Price must be positive')
    }

    const formattedPrice = computedPrice.toFixed(2)

    const trimmedName = trimString(name)
    if (trimmedName.length === 0) {
      return Result.Failure('Pricing name is required')
    }

    const pricing = new Pricing(name.trimEnd(), formattedPrice)
    return Result.Success(pricing)
  }
}
