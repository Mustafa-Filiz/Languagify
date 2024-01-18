import { ForwardRefExoticComponent, forwardRef, useState } from 'react'
import { Button, Input, InputProps } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface PasswordInputProps extends InputProps {}

const PasswordInput: ForwardRefExoticComponent<PasswordInputProps> = forwardRef(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible((prev) => !prev)

    return (
      <Input
        ref={ref}
        label="Password"
        type={isVisible ? 'text' : 'password'}
        endContent={
          <Button
            className="focus:outline-none"
            type="button"
            isIconOnly
            onClick={toggleVisibility}
          >
            {isVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </Button>
        }
        {...props}
      />
    )
  }
)

export default PasswordInput
