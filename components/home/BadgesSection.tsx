import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  Grid,
  Flex,
  Text,
  Center,
  Image,
} from '@chakra-ui/react'
import BadgeCard from '../badge/Badge'

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
  const [selectedButton, setSelectedButton] = useState<'badges' | 'mates'>(
    'badges'
  )

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  return (
    <Box
      w={{ base: '60%', md: '45%' }}
      mx="auto"
      mt={20}
      bg="transparent"
      borderRadius={'30px'}
    >
      <Grid templateColumns={{ base: '1fr', md: '1.3fr 3fr' }} gap={6}>
        {/* Columna 1 */}
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
          <Button
            mt={4}
            w="100%"
            bg="transparent"
            color="textBrand"
            _hover={{ bg: 'buttonPrimary.hover', color: 'black' }}
          >
            {"Let's Mate"}
          </Button>
        </Box>

        {/* Columna 2: Botones y Badges */}
        <Box>
          {/* Alineación de los botones a la izquierda */}
          <Flex justifyContent="flex-start" gap={4} mb={4}>
            {/* Botón "Mis Badges" */}
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

            {/* Botón "Mates" */}
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

          {/* Sección de Badges */}
          <Flex justifyContent="space-around">
            {selectedButton === 'badges'
              ? myBadges.map((badge) => (
                  <BadgeCard key={badge.name} badge={badge} />
                ))
              : Mates.map((mate) => <BadgeCard key={mate.name} badge={mate} />)}
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}

export default BadgesSection
