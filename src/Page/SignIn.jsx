import { Box, Button, Center, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { SiNike, SiJordan } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { IoEye, IoEyeOff } from 'react-icons/io5';


const SignIn = () => {
    const navigation = useNavigate()
    const { userReg, userAPI, setUserAPI, showToast, idProduct, setCurrentUserData } = useContext(AppContext)
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const userDataLogin = { email: userReg.email, password: data.password }

        const checkLogin = userAPI.find(item => {
            if (item.email === userDataLogin.email && item.password === userDataLogin.password) {
                return item
            }
        })

        if (checkLogin) {
            showToast('Đăng nhập thành công', '', 'info')
            localStorage.setItem('USERLOGIN', JSON.stringify(checkLogin))
            idProduct ? navigation('/Detail') : navigation('/')
            setCurrentUserData(checkLogin)
            localStorage.setItem('CURRENT_USER_DATA', JSON.stringify(checkLogin))

        } else {
            showToast('Sai password', 'vui lòng thử lại', 'error')
        }
    }

    useEffect(() => {
        axios.get('https://6516d0e109e3260018ca59a0.mockapi.io/UserData')
            .then(res => {
                const data = res.data
                setUserAPI(data)

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Center>
            <Box px={5} m={'50px auto'} w={[360, 400, 440, 480, 520, 560]} >
                <Flex gap={5}>
                    <Box cursor={'pointer'} fontSize={50} onClick={() => navigation('/')}>
                        <SiNike />
                    </Box>
                    <Box cursor={'pointer'} fontSize={40} onClick={() => navigation('/')}>
                        <SiJordan />
                    </Box>
                </Flex>

                <Box my={2}>
                    <Text mb={5} fontSize={30} fontWeight={600}>
                        What's your password?
                    </Text>

                    <Flex mt={5} flexWrap={'wrap'} gap={2} fontWeight={500}>
                        <Text fontWeight={500} color={'gray'}>{userReg.email}</Text>
                        <Text onClick={() => navigation('/SignInOrJoinUs')} cursor={'pointer'} textDecor={'underline'} fontWeight={'500'}>Change</Text>
                    </Flex>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box my={5}>
                            <InputGroup size='md'>
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    {...register("password", { required: 'This field is required' })}
                                    border={errors.password ? '1px solid red' : '1px solid #ccc'}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button variant={'ghost'} h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? <IoEyeOff /> : <IoEye />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <Text color={'red'}>{errors.password.message}</Text>}
                        </Box>

                        <Flex flexWrap={'wrap'} gap={2} fontWeight={'500'} color={'rgb(117, 117, 117)'} mt={5}>
                            By continuing, I agree to Nike’s <Text cursor={'pointer'} color={'black'} textDecor={'underline'}>Privacy Policy</Text> and <Text cursor={'pointer'} color={'black'} textDecor={'underline'}>Terms of Use.</Text>
                        </Flex>

                        <Button mt={5} float={'right'} px={10} py={6} rounded={50} bg={'black'} color={'white'} _hover={{ bg: '#707072', transition: 'all 0.1s linear' }} type="submit" >Continue</Button>
                    </form>
                </Box >

            </Box >
        </Center>
    )
}

export default SignIn