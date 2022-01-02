import React, { useState } from 'react'
import { convertValueTagIntoValueTransactions } from '../../lib/v4vHelpers'
import { V4VItem, ValueRecipient, ValueTag, ValueTransaction } from '../../types'

type Props = {
  action: 'Boost' | 'Streaming'
  amount: number
  headerText: string
  valueTag: ValueTag
  v4vItem: V4VItem
}

export const RecipientTable = ({ action, amount, headerText, valueTag, v4vItem }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false)
  const showMoreInfoText = showMoreInfo ? 'Hide more info' : 'Show more info'

  const toggleShowMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo)
  }

  const generateValueTransactions = () => {
    const roundDownValues = true
    return convertValueTagIntoValueTransactions(
      valueTag,
      v4vItem,
      action,
      amount,
      roundDownValues
    )
  }

  const valueTransactions = generateValueTransactions()

  const generateTableRows = () => {
    return valueTransactions.map((valueTransaction: ValueTransaction, index: number) => {
      const recipient = valueTransaction.normalizedValueRecipient

      return (
        <div className='recipient' key={`recipient-${index}`}>
          <div className='recipient-table-row'>
            <div className='name'>{recipient.name}</div>
            <div className='numbers-wrapper'>
              <div className='amount'>{recipient.amount}</div>
              {
                showMoreInfo && (
                  <div className='split'>&nbsp;/ {recipient.split}%</div>
                )
              }
            </div>
          </div>
          {
            showMoreInfo && (
              <>
                <div className='address'>Address: {recipient.address}</div>
                {
                  recipient.customKey && (
                    <div className='custom-key'>Custom key: {recipient.customKey}</div>
                  )
                }
                {
                  recipient.customValue && (
                    <div className='custom-value'>Custom value: {recipient.customValue}</div>
                  )
                }
              </>
            )
          }
        </div>
      )
    })
  }

  return (
    <div className='recipient-table'>
      <div className='recipient-table-header'>
        <div className='recipient-table-header-text'>{headerText}</div>
        <button className='toggle-show-more-info' onClick={toggleShowMoreInfo}>{showMoreInfoText}</button>
      </div>
      {generateTableRows()}
    </div>
  )
}
