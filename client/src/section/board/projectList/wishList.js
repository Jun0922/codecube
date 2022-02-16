import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'

import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PostCard, PostCardWrapper } from './publciList'

const WishListWrapper = styled.div`
  text-align: center;
  & > h2 {
    margin: 0 0 1rem 0;
  }
`

const WishList = () => {
  const { myProject } = useSelector((state) => state.boardReducer)
  const [_, setState] = useState(false)

  useEffect(() => {
    setState((prevState) => !prevState)
  }, [myProject])

  return (
    <>
      <PostCardWrapper>
        {!myProject.guest.confirmed.projectId ? (
          <WishListWrapper>
            <h2>수락 대기중</h2>
            {myProject.guest.wishList.map((post) => {
              return (
                <PostCard key={v4()}>
                  <h3>{post.title}</h3>
                  <div>{`참여인원 ${post.confirmed}/ 4`}</div>
                </PostCard>
              )
            })}
          </WishListWrapper>
        ) : (
          <WishListWrapper>
            <h2>참가중인 프로젝트</h2>
            <PostCard>
              <div>{myProject.guest.confirmed.title}</div>
              자세히 보기👁‍🗨
            </PostCard>
          </WishListWrapper>
        )}
      </PostCardWrapper>
    </>
  )
}

export default WishList
