import { http } from '@/utils/request'
import { useMockDataStore } from '@/stores/mock'
import { useUsersStore } from '@/stores/user'

interface UpdatePaymentRequestData {
  id: number
  cardNumber: string
  cardOwner: string
  cardValidDate: string
  cardValidCode: string
  bankCode: string
  bankAccount: string
}

export function updatePayment(data: UpdatePaymentRequestData) {
  const { isMocked, mockData } = storeToRefs(useMockDataStore())
  const { isUserTokenValid } = useMockDataStore()
  const { userToken } = storeToRefs(useUsersStore())
  const { forcedLogout } = useUsersStore()

  if (!isMocked.value) {
    return http.patch<void>({
      url: `/payment/${data.id}`,
      data,
    })
  }

  if (isUserTokenValid(userToken.value) === false) {
    forcedLogout()
    return
  }

  if (mockData.value == null)
    return

  const paymentList = mockData.value.payment as any[]
  const thePayment = paymentList.find(item => item.id === data.id)

  if (thePayment.cardNumber !== '') {
    thePayment.cardNumber = data.cardNumber
    thePayment.cardOwner = data.cardOwner
    thePayment.cardValidDate = data.cardValidDate
    thePayment.cardValidCode = data.cardValidCode
  }
  else if (thePayment.bankCode !== '') {
    thePayment.bankCode = data.bankCode
    thePayment.bankAccount = data.bankAccount
  }
}
