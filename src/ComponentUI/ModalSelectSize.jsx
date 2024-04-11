import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Button,
    Text,
    Box,
    Flex,
    Image,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AppContext } from '../Context/AppContext'

function ModalSelectSize({ item, setProductAddToBag, productAddToBag }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { showToast, currentUserData, setCurrentUserData } = useContext(AppContext)


    const [selectSize, setSelectSize] = useState(() => {
        return item.sizes.map(() => false)
    })

    const checkActive = (index, itemAdd) => {
        const newSizeState = item.sizes.map(() => false)
        newSizeState[index] = true
        setSelectSize(newSizeState)
        setProductAddToBag({ ...item, sizePicked: itemAdd, amount: 1 })
    }

    const handleAddToCart = () => {
        if (productAddToBag.sizePicked === undefined) {
            showToast('Không thể thêm vào giỏ hàng', 'Vui lòng chọn 1 size và thử lại', 'warning')
        } else {
            const newCart = [...currentUserData.cart, productAddToBag]

            showToast('Đã thêm vào giỏ hàng', '', 'success')
            setCurrentUserData(prev => ({ ...prev, cart: newCart }))
            onClose()
        }
    }

    return (
        <>
            <Box onClick={onOpen} mt={5}>
                <Button border={'1px solid #ccc'} _hover={{ border: '1px solid black' }} rounded={30} p={6} variant={'outline'}>Select Size</Button>
            </Box>

            <Modal size={['sm', 'md', 'lg', '4xl', '4xl', '4xl']} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Flex flexDir={['column', 'column', 'column', 'row', 'row']}>
                            <Box w={'80%'} overflow={'hidden'} m={'0 auto'}>
                                <Image mt={-10} w={'100%'} transform={'scale(1.1)'} src={item.image} alt={item.name} />
                            </Box>

                            <Flex w={'80%'} flexDir={'column'} justifyContent={'space-between'} p={5} gap={5}>
                                <Box>
                                    <Text fontSize={18} fontWeight={500}>{item.category}</Text>
                                    <Text fontSize={30} fontWeight={500}>{item.name}</Text>
                                    <Text fontSize={18} fontWeight={500}>{(item.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                </Box>

                                <Box>
                                    <Text fontWeight={500} fontSize={20}>Select Size</Text>

                                    <Grid templateColumns='repeat(3, 1fr)' gap={1}>
                                        {item.sizes.map((item, index) => {
                                            return (
                                                <GridItem key={index} textAlign={'center'} rounded={10} w={'100%'} py={3} px={4} transition={'all 0.3s linear'}
                                                    _hover={{ border: '1px solid black' }} cursor={'pointer'}
                                                    border={selectSize[index] ? '1px solid black' : '1px solid #ccc'}
                                                    onClick={() => checkActive(index, item)}>
                                                    {item}
                                                </GridItem>
                                            )
                                        })}
                                    </Grid>

                                    <Button w={'100%'} onClick={handleAddToCart} mt={5} bg={'black'} color={'white'} border={'1px solid #ccc'} _hover={{ border: '1px solid black' }} rounded={15} p={6} variant={'outline'}>Add to Cart</Button>

                                </Box>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalSelectSize