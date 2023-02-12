import React, { PropsWithChildren } from 'react'

import { Container, Content, DescriptionText, TitleContainer, TitleText } from './styles'

interface Props extends PropsWithChildren {
  title: string
  description?: string
}

const Section: React.FC<Props> = (props) => {
  const { title, children, description } = props

  return (
    <Container>
      <TitleContainer>
        <TitleText>{title}</TitleText>
      </TitleContainer>
      {description && <DescriptionText>{description}</DescriptionText>}
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default Section