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
import PasswordInput from '../../components/PasswordInput'
import { SignUpSchema, SignUpType } from '../../schemas/SignUp'
import { useCreateUser } from '../../services/AuthService'
import Link from '../../components/Link'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
  })

  const { mutate: createUser, isPending } = useCreateUser()

  const onSubmit: SubmitHandler<SignUpType> = (values) => {
    createUser(values)
  }

  return (
    <div className="flex-center">
      <Card
        classNames={{
          base: 'border-none bg-background/80 w-96',
          body: 'flex flex-col gap-4',
          footer: 'flex flex-col gap-4',
        }}
        isBlurred
        shadow="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-2xl flex-center">Sign Up</CardHeader>
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
              isLoading={isPending}
            >
              Submit
            </Button>
            <Link
              to="/login"
              className="text-sm"
            >
              Back to login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignUp
