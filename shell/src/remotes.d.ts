declare module "customer_list/CustomerList" {
  const CustomerList: import("react").ComponentType<{
    selectedId?: number
    onSelect?: (id: number) => void
  }>
  export default CustomerList
}

declare module "customer_detail/CustomerDetail" {
  const CustomerDetail: import("react").ComponentType<{
    customerId?: number
  }>
  export default CustomerDetail
}
