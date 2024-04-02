import { Box, Button, Container, Divider, Flex, Grid, GridItem, Image, Select, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()
    const { bagList, setBagList, showToast } = useContext(AppContext)
    const [priceTotal, setPriceTotal] = useState(0)
    const feeShip = 250000
    const totalPay = priceTotal + feeShip

    useEffect(() => {
        const totalPrice = bagList.reduce((price, product) => price + (product.amount * product.price * 24500), 0)
        setPriceTotal(totalPrice)
    }, [bagList])

    const handleChangeAmount = (isTrue, productID) => {
        if (isTrue) {
            const updateBagList = bagList.map((item, index) => {
                if (item.id === productID) {
                    return { ...item, amount: item.amount + 1 }
                }
                return item
            })
            setBagList(updateBagList)
        } else {
            const updateBagList = bagList.map((item, index) => {
                if (item.id === productID) {
                    return { ...item, amount: item.amount <= 1 ? 1 : item.amount - 1 }
                }
                return item
            })
            setBagList(updateBagList)
        }
    }

    const handleCheckout = () => {
        setBagList([])
        showToast('Thanh toán thành công', 'Bạn có thể theo dõi đơn hàng trong phần thông tin', 'success')
        navigate('/')
    }


    return (
        <Box>
            <Container my={70} maxW={'50vw'}>
                <Flex justifyContent={'center'} gap={10}>
                    <Box w={'100%'}>
                        <Box mb={10}>
                            <Text fontSize={30} fontWeight={500}>
                                Bag
                            </Text>
                        </Box>

                        <Grid rowGap={10} templateColumns='repeat(1, 1fr)' >
                            {bagList.map((item, index) => {
                                return (
                                    <GridItem key={item.id} w={'100%'} borderBottom={'1px solid #ccc'} pb={5}>
                                        <Flex>
                                            <Box w={200} overflow={'hidden'}>
                                                <Image mt={-5} src={item.image} alt={item.name} />
                                            </Box>

                                            <Box justifyContent={'space-between'} w={'100%'} py={2} px={4}>
                                                <Flex>
                                                    <Box>
                                                        <Text mb={2} fontWeight={500} fontSize={20}>{item.name}</Text>
                                                        <Text mb={2} fontWeight={500} color={'GrayText'}>{item.category}</Text>
                                                        <Flex gap={5}>
                                                            <Select w={100} placeholder={item.sizePicked}>
                                                                {item.sizes.map((size, index) => {
                                                                    if (size !== item.sizePicked) {
                                                                        return (
                                                                            <option key={index} value={size}>{size}</option>
                                                                        );
                                                                    } else {
                                                                        return null
                                                                    }
                                                                })}
                                                            </Select>

                                                            <Flex w={100} justifyContent={'space-between'} border={'1px solid black'} rounded={5} px={2} gap={2} align={'center'}>
                                                                <Box onClick={() => handleChangeAmount(false, item.id)} cursor={'pointer'} border={'1px solid #ccc'}>
                                                                    <FaMinus />
                                                                </Box>

                                                                <Box >
                                                                    <Text>{item.amount}</Text>
                                                                </Box>

                                                                <Box onClick={() => handleChangeAmount(true, item.id)} cursor={'pointer'} border={'1px solid #ccc'}>
                                                                    <FaPlus />
                                                                </Box>
                                                            </Flex>
                                                        </Flex>
                                                    </Box>

                                                    <Box fontWeight={500} fontSize={20} textAlign={'right'} w={'100%'}>
                                                        {(item.price * 24500 * item.amount).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </Flex>

                                    </GridItem>
                                )
                            })}
                        </Grid>



                    </Box>

                    <Box w={'60%'}>
                        <Box mb={5}>
                            <Text fontSize={30} fontWeight={500}>
                                Summary
                            </Text>
                        </Box>

                        <Box>
                            <Flex mb={3} alignItems={'center'} justifyContent={'space-between'} fontWeight={500}>
                                <Text>
                                    Subtotal
                                </Text>

                                <Text>
                                    {priceTotal.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </Flex>

                            <Flex mb={3} alignItems={'center'} justifyContent={'space-between'} fontWeight={500}>
                                <Text>
                                    Estimated Delivery & Handling
                                </Text>

                                <Text>
                                    {feeShip.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </Flex>

                            <Divider color={'black'} />

                            <Flex my={5} alignItems={'center'} justifyContent={'space-between'} fontWeight={500}>
                                <Text>
                                    Total
                                </Text>

                                <Text>
                                    {totalPay.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </Flex>

                            <Divider />

                            <Button onClick={handleCheckout} py={7} rounded={50} w={'100%'} bg={'black'} color={'white'} variant={'outlined'} >
                                Checkout
                            </Button>

                        </Box>

                    </Box>
                </Flex>
            </Container>
        </Box>
    )
}

export default Cart