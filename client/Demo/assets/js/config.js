var SAurl = "https://demo-dot-eoswonderful.appspot.com"
var eos = Eos({
  httpEndpoint: 'https://proxy.eosnode.tools',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  debug: true
})
/*var eos = Eos({
  httpEndpoint: 'https://api-kylin.eosasia.one',
  chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  debug: true
})*/
var contract = "demo1thefull" // NEED CHANGE
var symbol = "COF"
var account_tb = "keybalance"