# EOS-Wonderful
EOS-Wonderful API and Test Network for DEMO
- - -
# 테스트넷
토큰 발행 및 전송 dApp  
> [http://35.194.102.54/client/](http://35.194.102.54/client/)  

SA API http link  
> http://35.194.102.54:9880   

대상 체인  
> Crypto Kylin TestNet https://github.com/cryptokylin  

CA 계정명  
> humblefirm42  
- - -
# 설명 
EOS-Wonderful(이하 이오스 원더풀)은 이중검증 스마트 컨트랙트를 기반으로 이용하여 '탈중앙' 이라는 블록체인의 기본 컨셉을 유지함과 동시에 퍼블릭 블록체인인 이오스 메인 네트워크(이하 메인넷)에 계정을 생성하지 않고도 이용 할 수 있도록 한다.

**현재 구현 된 기능들은 데모를 위한 최소한의 것**들로서 이소스 원더풀이 궁극적으로 목표하고 있는 수준은 미치지 않는다. 아직 계정 없이 토큰을 전송 할 수 있는 정도만 구현되어 있지만 이것만으로도 현존하는 **대부분의 dApp(분산 어플리케이션)을 지원**할 수 있다. 

- - -
# 사용 설명
#### 이오스 원더풀 기반의 dApp 제작을 위해서 숙지해야 할 사항은 다음과 같다.
1. 이오스 원더풀 스마트 컨트랙트 계정
2. 메인넷에 연결되는 자원 소모 계정과 API 서버
3. 서버와 연동되는 dApp용 클라이언트 SDK

스마트 컨트랙트 계정(Smart Contract Account, 이하 CA)은 실제 유저들의 토큰과 수수료 등 모든 정보들이 저장되는 계정인데 현재 진행 단계에서는 한 유저당 210 바이트 미만의 램을 소모한다. 또한 CA의 멀티 시그는 개발진의 판단에 따라 분권화 또는 탈중앙이 가능하며, 직접적으로 CPU 사용 시간이나 네트워크 대역폭을 소모하지는 않는다.  


자원 소모 계정(bandwidth Service Account, 이하 SA)은 실제로 자원을 소모하는 계정으로 경우에 따라서 CA가 SA 역할을 대체하여도 무방하다.  
현재는 SA를 대상으로 하는 서비스 거부(이하 DOS) 공격을 방지하기 위해 수수료-홀딩 방식을 사용하고 있다._(이후에는 수수료 채굴 방식으로 변경될 예정이다.)_  
원더풀 이오스의 유저가 발생시키는 트랜잭션의 서명은 SA 계정의 서명이기 때문에, 사용자는 계정 해킹의 위험없이 안전하게 계정을 제공하기 위해 API 서버를 구축해야한다.  
현재로서는 일반 사용자가 접근하기엔 어려운 영역이지만, 이후 일반인도 쉽게 가능하도록 사용자 경험을 최적화할 예정이다.

유저가 수수료를 지불하고 SA 계정을 사용하기 위해서는 SA API SERVER와 연결하고 정해진 프로토콜에 맞춰 액션 데이터를 생성해야 한다. 이것을 간편하게 구현하기 위해서 EOSJS 기반의 클라이언트 SDK를 사용한다.

- - -
# 사용 예시
### 1. 테스트넷 사용
간단한 테스트를 위해 원더풀 플랫폼에서 구축한 데모용 CA와 SA로 구성된 가상 dApp을 사용해본다.  
1. http://35.194.102.54/client/ 에 접속합니다.
> 브라우저에서 즉시 임의의 프라이빗키를 생성합니다.  이전에 사용하던 프라이빗키를 입력하는 경우 이전의 데이터를 재사용할 수 있습니다. 
2. 내 계정에 새로운 코인을 발행 받습니다.
> Mint coin에서 정보를 입력 후 Mint 버튼을 누릅니다.
3. 내 계좌의 돈을 확인 해봅니다.
> View Money에서 계좌 정보를 입력하고 Check!버튼을 누릅니다.
4. 다른 계정에 송금해봅니다.
> 보낼 상대방의 키를_(없으면 하단 계정 목록에서 임의 선택하여)_ 입력하고 액수를 입력한 뒤에 Send! 버튼을 누릅니다.  
> 송금시 1코인은 8시간 동안 홀딩됨으로, 현재 잔액에서 1코인을 뺀 값 이하의 값을 입력해야합니다.
5. 내 계좌와 보낸 상대방의 계좌를 확인해봅니다.
> 코인이 이동한것을 확인할 수 있습니다.

### 2. 테스트넷에서 댑 개발
직접 dApp을 개발하고 테스트넷 SA API http link에 연결한다.  

### 3. 테스트넷에서 SA 구축
테스트넷에서 SA를 구성하여 자신의 EOS 계정을 댑에 연동해본다

### 4. 멀티버스 직접 구현
테스트넷을 사용하지 않고 완전히 별개의 이오스 원더풀 기반 멀티버스를 구축하여 이용한다.  
이 경우 멀티버스를 구축한 제 3자는 수수료의 홀딩량과 홀딩 시간을 직접 설정할 수 있으며, 토큰 발행량 및 전체적인 컨센서스를 직접 개발할 수 있다.  
다만 이 경우 CA는 유저당 210바이트 미만의 램 외에도 스마트 컨트랙트를 업로드하기 위해 약 700KB 미만의 램을 소모하기 때문에 사전에 충분한 램이 확보되어야 한다.

- - -

# 저작권 Licence
(C) 2018. Suntae Kim all rights reserved. All Page content is property of Suntae Kim

이 저작물은 [CC BY-NC-SA 2.0 KR](https://creativecommons.org/licenses/by-nc-sa/2.0/kr/)에 따라 이용할 수 있습니다. (단, 라이선스가 명시된 일부 문서 및 삽화 제외)

이 저작물은 비영리 목적하에 출처를 표기하여 자유롭게 사용할 수 있습니다. 영리 목적 사용을 원하는 경우 kstae@1thefull.com 로 연락 부탁드립니다.
