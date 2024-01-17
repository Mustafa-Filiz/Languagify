import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  example: string
  exampleRequired: string
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    <div className="flex-center h-full">
      <Card className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>Login</CardHeader>
          <CardBody>
            <Input
              defaultValue="test"
              {...register('example')}
            />
            <Input {...register('exampleRequired', { required: true })} />
            {errors.exampleRequired && <span>This field is required</span>}
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Login
