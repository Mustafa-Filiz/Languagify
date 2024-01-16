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

const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .required()

type SignUpSchemaType = z.infer<typeof SignUpSchema>

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
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
              {...register('email')}
              label="Email"
              isRequired
              errorMessage={errors?.email?.message}
            />
            <PasswordInput
              {...register('password')}
              isRequired
              errorMessage={errors?.password?.message}
            />
            <PasswordInput
              {...register('passwordConfirmation')}
              label="Password Confirmation"
              isRequired
              errorMessage={errors?.passwordConfirmation?.message}
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
