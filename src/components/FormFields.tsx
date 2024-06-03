import type { ControllerRenderProps } from 'react-hook-form'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

type FormFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, any> | undefined
  isLoading: boolean
  label?: string
  placeholder?: string
}

export const NameField = ({
  isLoading,
  label,
  placeholder,
  field,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="name">
        {label ?? 'Name'}
      </FormLabel>
      <FormControl>
        <Input
          id="name"
          placeholder={placeholder ?? 'John Smith'}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const EmailField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="email">
        {label ?? 'Email'}
      </FormLabel>
      <FormControl>
        <Input
          id="email"
          placeholder={placeholder ?? 'name@example.com'}
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const AddressField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="address">
        {label ?? 'Street address'}
      </FormLabel>
      <FormControl>
        <Input
          id="address"
          placeholder={placeholder ?? 'street address'}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const SuburbField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="suburb">
        {label ?? 'Suburb'}
      </FormLabel>
      <FormControl>
        <Input
          id="suburb"
          placeholder={placeholder ?? 'suburb'}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const CityField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="city">
        {label ?? 'City'}
      </FormLabel>
      <FormControl>
        <Input
          id="city"
          placeholder={placeholder ?? 'city'}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const PostcodeField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="postcode">
        {label ?? 'Postcode'}
      </FormLabel>
      <FormControl>
        <Input
          id="postcode"
          placeholder={placeholder ?? 'postcode'}
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export const PhoneNumberField = ({
  field,
  isLoading,
  label,
  placeholder,
}: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor="phoneNumber">
        {label ?? 'Phone number'}
      </FormLabel>
      <FormControl>
        <Input
          id="phoneNumber"
          placeholder={placeholder ?? '0412 345 678'}
          type="tel"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

type PasswordFieldProps = FormFieldProps & {
  isConfirm?: boolean
}
export const PasswordField = ({
  field,
  isLoading,
  isConfirm,
}: PasswordFieldProps) => {
  const name = isConfirm ? 'confirmPassword' : 'password'
  return (
    <FormItem>
      <FormLabel className="sr-only" htmlFor={name}>
        {isConfirm ? 'Confirm Password' : 'Password'}
      </FormLabel>
      <FormControl>
        <Input
          id={name}
          placeholder="password"
          type="password"
          autoCapitalize="none"
          autoComplete={isConfirm ? 'current-password' : 'new-password'}
          disabled={isLoading}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
