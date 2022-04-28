class BankAccount {
  constructor(name) {
    this.name = name
    this.balance = 0
  }
  credit(amount) {
    this.balance += amount
  }
  describe(){
    console.log(`owner: ${this.name}, balance:${this.balance}`)
  }
}

const accountsList =[]
accountsList.push(new BankAccount('Sean'))
accountsList.push(new BankAccount(`Brad`))
accountsList.push(new BankAccount(`Georges`))

accountsList.forEach(account => {
  account.credit(1000)
  account.describe()
})