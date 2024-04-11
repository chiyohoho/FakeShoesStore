import { Box, Button, Divider, Flex, Image, Select, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { IoTrashBin } from 'react-icons/io5';

const Cart = () => {
    const navigate = useNavigate()
    const { showToast, currentUserData, setCurrentUserData } = useContext(AppContext)
    const [priceTotal, setPriceTotal] = useState(0);
    const [feeShip, setFeeShip] = useState(250000);
    const [totalPay, setTotalPay] = useState(0);

    useEffect(() => {
        const totalPrice = currentUserData.cart.reduce((price, product) => price + (product.amount * product.price * 24500), 0)
        setPriceTotal(totalPrice)

        let newFeeShip
        if (totalPrice < 5000000) {
            newFeeShip = 250000
        } else if (totalPrice >= 5000000 && totalPrice < 10000000) {
            newFeeShip = 150000
        } else {
            newFeeShip = 0
        }

        setFeeShip(newFeeShip)
        setTotalPay(totalPrice + newFeeShip)
    }, [currentUserData.cart]);

    const handleChangeAmount = (isTrue, productID) => {
        if (isTrue) {
            const updateBagList = currentUserData.cart.map((item, index) => {
                if (item.id === productID) {
                    return { ...item, amount: item.amount + 1 }
                }
                return item
            })
            setCurrentUserData(prev => ({ ...prev, cart: updateBagList }))
        } else {
            const updateBagList = currentUserData.cart.map((item, index) => {
                if (item.id === productID) {
                    return { ...item, amount: item.amount <= 1 ? 1 : item.amount - 1 }
                }
                return item
            })
            setCurrentUserData(prev => ({ ...prev, cart: updateBagList }))
        }
    }

    const handleCheckout = () => {
        setCurrentUserData(prev => ({ ...prev, cart: [] }))
        showToast('Thanh toán thành công', 'Bạn có thể theo dõi đơn hàng trong phần thông tin', 'success')
        navigate('/')
    }

    const handleDeleteProduct = (productIndex) => {
        const newBagList = [...currentUserData.cart]
        const indexOfProduct = newBagList.findIndex((item, index) => index === productIndex)

        if (indexOfProduct !== -1) {
            newBagList.splice(indexOfProduct, 1)
            setCurrentUserData(prev => ({ ...prev, cart: newBagList }))
        }
    }

    return (
        <Box minH={'50vh'} px={10} maxW={1000} my={70} mx={'auto'}>
            {currentUserData.cart.length > 0 ?
                <Flex flexDir={['column', 'column', 'column', 'row', 'row', 'row']} gap={10}>
                    <Box w={'100%'}>
                        <Box mb={10}>
                            <Text fontSize={30} fontWeight={500}>
                                Bag
                            </Text>
                        </Box>

                        <Box>
                            {currentUserData.cart.map((item, index) => {
                                return (
                                    <Box transform={['scale(0.8)', 'scale(0.9)', 'scale(1)', 'scale(1)', 'scale(1)', 'scale(1)']} key={index} borderBottom={'1px solid #ccc'} pb={5} mb={10}>
                                        <Flex gap={5}  >
                                            <Box minW={120} maxW={160}>
                                                <Image w={'100%'} src={item.image} alt={item.name} />
                                            </Box>

                                            <Flex flexDir={'column'} justifyContent={'space-between'} w={'100%'}>
                                                <Text fontWeight={500} fontSize={[16, 16, 16, 18, 19, 20]}>{item.name}</Text>
                                                <Text fontWeight={500} fontSize={[15, 15, 15, 16, 17, 18]} color={'GrayText'}>{item.category}</Text>
                                                <Flex gap={10} >
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

                                                    <Flex justifyContent={'space-between'} border={'1px solid black'} rounded={5} px={2} gap={2} align={'center'}>
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

                                                <Flex mt={5} justifyContent={'space-between'} fontWeight={500} fontSize={20}>
                                                    <Text >
                                                        {(item.price * 24500 * item.amount).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                    </Text>

                                                    <Button onClick={() => handleDeleteProduct(index)} w={50} bg={'black'} color={'white'} _hover={{ bg: 'gray' }}>
                                                        <IoTrashBin />
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>

                    <Box w={['100%', '100%', '100%', 600, 600, 600]}>
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
                :
                <Box fontSize={40} fontWeight={600} textAlign={'center'}>
                    Giỏ hàng của bạn hiện đang trống
                </Box>
            }
        </Box>
    )
}

export default Cart