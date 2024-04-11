import { Box, Button, Center, Flex, Input, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { SiNike, SiJordan } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';


const SignInOrJoinUs = () => {
    const navigation = useNavigate()
    const { userAPI, setUserAPI, setUserReg } = useContext(AppContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const checkEmailExist = userAPI.some(item => item.email === data.email)

        if (!checkEmailExist) {
            setUserReg(prevState => {
                return { ...prevState, email: data.email }
            })
            navigation('/JoinUs')
        } else {
            setUserReg(prevState => {
                return { ...prevState, email: data.email }
            })
            navigation('/SignIn')
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
            <Box px={5} m={'50px auto'} w={[360, 400, 440, 480, 520, 560]}>
                <Flex gap={5}>
                    <Box cursor={'pointer'} fontSize={50} onClick={() => navigation('/')}>
                        <SiNike />
                    </Box>
                    <Box cursor={'pointer'} fontSize={40} onClick={() => navigation('/')}>
                        <SiJordan />
                    </Box>
                </Flex>

                <Box my={2}>
                    <Text fontSize={30} fontWeight={600}>
                        Enter your email to join us or sign in.
                    </Text>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box my={5}>
                            <Input
                                {...register("email", { required: true })}
                                type='email'
                                placeholder='Email*'
                                border={errors.email ? '1px solid red' : '1px solid #ccc'}
                            />
                            {errors.email && <Text color={'red'}>This field is required</Text>}
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

export default SignInOrJoinUs