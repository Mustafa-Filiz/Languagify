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
import PasswordInput from '../../components/ui/PasswordInput'
import { signUpSchema, SignUpSchemaType } from '../../schemas/SignUp'
import { useCreateUser } from '../../services/AuthService'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutate: createUser, isPending } = useCreateUser()

  const onSubmit: SubmitHandler<SignUpSchemaType> = (values) => {
    console.log('🤖 ~ values:', values)
    createUser(values)
  }

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
              isLoading={isPending}
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
