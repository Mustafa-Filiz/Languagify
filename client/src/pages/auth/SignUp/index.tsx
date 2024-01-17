import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PasswordInput from '../../../components/ui/PasswordInput'

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })

type SignUpSchemaType = z.infer<typeof signUpSchema>

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data)

  return (
    <div className="flex-center min-h-screen">
      <Card
        classNames={{
          base: 'border-none bg-background/80 w-96',
          body: 'flex flex-col gap-4',
        }}
        isBlurred
        shadow="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-xl flex-center">SignUp</CardHeader>
          <CardBody>
            <Input
              {...register('firstName')}
              label="First Name"
              isRequired
              errorMessage={errors?.firstName?.message}
            />
            <Input
              {...register('lastName')}
              label="Last Name"
              isRequired
              errorMessage={errors?.lastName?.message}
            />
            <Input
              {...register('email')}
              label="Email"
              isRequired
              errorMessage={errors?.email?.message}
            />
            <PasswordInput
              {...register('password')}
              label="Password"
              isRequired
              errorMessage={errors?.password?.message}
            />
            <PasswordInput
              {...register('confirmPassword')}
              label="Confirm Password"
              isRequired
              errorMessage={errors?.confirmPassword?.message}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignUp
