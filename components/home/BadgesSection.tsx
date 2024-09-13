import React, { Fragment, useState } from 'react'
import {
  Box,
  Button,
  Input,
  Grid,
  Flex,
  Text,
  Center,
  Image,
  useDisclosure,
} from '@chakra-ui/react'
import BadgeCard from '../badge/Badge'
import ModalAddMate from '../modals/ModalAddMate'
import toast from 'react-hot-toast'

const myBadges = [
  {
    name: 'ETH Mexico 2024',
    image: '/images/events/eth-mexico-2024.png',
  },
]
const Mates = [
  {
    name: 'Mate 1',
    userName: 'mate1',
    image: '/images/events/eth-mexico-2024.png',
  },
  {
    name: 'Mate 2',
    userName: 'mate2',
    image: '/images/events/eth-mexico-2024.png',
  },
  {
    name: 'Mate 3',
    userName: 'mate3',
    image: '/images/events/eth-mexico-2024.png',
  },
]
const BadgesSection = () => {
  const [code, setCode] = useState('')
  const [username, setUsername] = useState('')
  const [selectedButton, setSelectedButton] = useState<'badges' | 'mates'>(
    'badges'
  )
  const [modalState, setModalState] = useState<'confirm' | 'loading' | 'verified'>('confirm')
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const onConfirm = async () => {
    try {
      console.log('confirming');
      setModalState('loading')
    } catch (error) {
      console.log('error on function ',error)
    }
  }
  const onOpenModal = () => {
    if(!code || !username || code.length < 4 || username.length < 3) {
      toast.error('Please enter valid code and username')
      return
    }
    setModalState('confirm')
    onOpen()
  }
  return (
    <Fragment>
      <Box
        w={{ base: '60%', md: '45%' }}
        mx="auto"
        mt={10}
        bg="transparent"
        borderRadius={'30px'}
      >
        <Grid templateColumns={{ base: '1fr', md: '1.3fr 3fr' }} gap={6}>
          <Box
            p={4}
            boxShadow="lg"
            borderColor={'brand.200'}
            borderWidth={0.8}
            bg="transparent"
            borderRadius={'30px'}
          >
            <Center mb={4}>
              <Image
                src="/images/login/login-logo.svg"
                width={70}
                height={70}
                alt="Logo Image"
              />
            </Center>

            <Input
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter Mate Pin"
              bg="transparent"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: 'gray.400' }}
            />
            <Input
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
              bg="transparent"
              borderColor="gray.600"
              color="white"
              _placeholder={{ color: 'gray.400' }}
              mt={3}
            />
            <Button
              mt={4}
              w="100%"
              bg="transparent"
              color="textBrand"
              _hover={{ bg: 'buttonPrimary.hover', color: 'black' }}
              onClick={onOpenModal}
            >
              {"Let's Mate"}
            </Button>
          </Box>

          <Box>
            <Flex justifyContent="flex-start" gap={4} mb={4}>
              <Button
                bg={selectedButton === 'badges' ? 'gray.700' : 'transparent'}
                color="white"
                _hover={{ bg: 'gray.600' }}
                borderRadius="full"
                px={6}
                onClick={() => setSelectedButton('badges')}
                borderColor={'#D9D9D9'}
                borderWidth={1}
              >
                My Badges
              </Button>

              <Button
                bg={selectedButton === 'mates' ? 'gray.700' : 'transparent'}
                color="white"
                _hover={{ bg: 'gray.600' }}
                borderRadius="full"
                px={6}
                onClick={() => setSelectedButton('mates')}
                borderColor={'#D9D9D9'}
                borderWidth={1}
              >
                Mates
              </Button>
            </Flex>

            <Flex justifyContent="space-around">
              {selectedButton === 'badges'
                ? myBadges.map((badge) => (
                    <BadgeCard key={badge.name} badge={badge} />
                  ))
                : Mates.map((mate) => (
                    <BadgeCard key={mate.name} badge={mate} />
                  ))}
            </Flex>
          </Box>
        </Grid>
      </Box>
      <ModalAddMate 
        isOpen={isOpen} 
        onClose={onClose}
        username={username}
        code={code}
        handleConfirm={onConfirm}
        modalState={modalState}
      />
    </Fragment>
  )
}

export default BadgesSection
