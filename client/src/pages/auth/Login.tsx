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
import { LoginSchema, LoginType } from '../../schemas/Login'
import Link from '../../components/Link'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginType> = (values) => {
    console.log('🤖 ~ values:', values)
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
          <CardHeader className="text-2xl flex-center">Login</CardHeader>
          <CardBody>
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
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
              fullWidth
              // isLoading={isPending}
            >
              Submit
            </Button>
            <Link
              to="/sign-up"
              className="text-sm"
            >
              Sign up now
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
