//as const (const assertion)

const direction = {
    UP: 'up',
    DOWN: 'down'
} as const

// direction.UP = 'left'
// console.log(direction.UP)

// const envs = ['dev', 'uat', 'prod'] as const
// envs.push()
// Khóa cứng object 

//typeof
//1. trả về kiểu dữ liệu
//2. copy kiểu dữ liệu từ 1 đối tượng đã có sẵn
const settings = {
    theme: 'dark',
    notification: true,
    version: 1.0
}
//type
interface Settings {
    theme: string;
    notifications: boolean;
    version: number;
}

type SettingsType = typeof settings

//keyof :lấy ra các key của 1 obj
interface User {
    id: number,
    name: string,
    email: string
}

type UserKey = keyof User
//tương đương vs type UserKeys = 'id' | 'name' | 'email'

const Colors = {
    Red: '#FF0000',
    Green: '#00FF00',
    Blue: '#0000FF'
} as const
//2 cách lấy giá trị trong 1 object
// console.log(Colors.Green);
// console.log(Colors['Green']);

//Viết 1 hàm nhận đúng tên màu có trog object
//B1 : typeof Color 
type ColorsType = typeof Colors

//B2 : keyof ColorsType
type ColorName = keyof typeof Colors

function changeColor(color: ColorName) {
    console.log(Colors[color]);
}

changeColor('Green')

const configEnv = {
    endPoint: 'https://api.com',
    timeOut: 5000,
    retries: 3
}

const config = {
    endPoint: 'https://api2.com',
    timeOut: 3000,
    retries: 3
} as const

type Config = typeof config
type ConfigKey = keyof Config

//lấy keyof của 1 type
type ConfigDirect = keyof typeof config

//Viết 1 hàm lấy giá trị của config
function getConfigValue(key: keyof typeof config) {
    return config[key]
}
const endPoint = getConfigValue('endPoint')
const timeout = getConfigValue('timeOut')

//Có 2 thể giới trong typescript song song vs nhau
//1. thế giới type : type, interface
//2. thế giới value : const, let, var, function
//keyof là 1 công cụ của thế giới type


//Partial
//Ý nghĩa : 1 phần
interface UserProfile {
    id: number,
    name: string,
    email: string,
    age: number
}
//Cú pháp Partial<T>
//Viết 1 hàm updateProfile
function updateProfile(original: UserProfile, updates: Partial<UserProfile>): UserProfile {
    return {
        ...original,
        ...updates
    }
}

const userA: UserProfile = {
    id: 1,
    name: 'A',
    email: '123@gmail.com',
    age: 20
}

const userB = updateProfile(userA, { age: 21 })
console.log(userB);

//Rest param (...)
interface UserEnity {
    id: string,
    username: string,
    password: string,
    secretKey: string,
    role: string
}

const dbUser: UserEnity = {
    id: 'u1', username: 'admin', password: '123', secretKey: 'abc', role: 'admin'
}

function chuanHoaUser(user: UserEnity) {
    //su dung rest param va destructuring de tach password , secretkey ra khoi phan con lai
    const { password, secretKey, ...safeUser } = user
    return safeUser
}

const clientData = chuanHoaUser(dbUser)
console.log(clientData);


const user = {
    name: 'Alice',
    age: 25
}
//destructuring
const { name, age } = user
const { name: userName } = user
console.log(name);
console.log(userName);

const colors = ['red', 'green']
const c1 = colors[0]
const [first, second] = colors
console.log(first);

const settings2 = {
    theme: 'dark',
    volumn: 80,
    wifi: true,
    bluetooth: false
}

// const {theme, volumn, ...others} = settings2
// console.log(others);

const races = ['Hải', 'Minh', 'Tùng', 'Lan']
const [winner, nhi, ...others] = races
console.log(winner);
console.log(others);

//Records
//Sử dụng records để tạo ra object giống như 1 cuốn từ điển nơi bạn chưa biết tên key cụ thể nhưng biết kiểu
//dữ liệu của chúng
type ProductPrices = Record<string, number>
const prices: ProductPrices = {
    laptop: 1500,
    mouse: 25
}

type OrderStatus = 'pending' | 'shipping' | 'delivered'
const statusLabel: Record<OrderStatus, string> = {
    'delivered': 'Giao hang thanh cong',
    'shipping': 'Dang giao hang',
    'pending': 'Dang cho xu ly'
}

//Closure : hàm trả về 1 hàm
//Khi 1 hàm chạy xong nó chết đi, quên đi kí ức ( biến cục bộ bị xóa khỏi bộ nhớ)
//Closure : khi hàm cha return 1 hàm con, hàm con đó giống như đc đeo 1 balo kí ức, trong balo chứa tất cả
//các biến của hàm cha dù hàm cha đã chạy xong, hàm con vẫn mang theo cái balo này

function hamCha(x: number) {
    //biến này nằm trong phạm vi của cha, biến cục bộ
    let bienCuaCha = x;
    return function hamcon(y: number) {
        return bienCuaCha + y
    }
}
//cú pháp quan trọng : phải hứng giá trị của closure = 1 biến
const add5 = hamCha(5)
console.log(add5(2));

//Ứng dụng :
//Tạo ra nhà hàng tạo hàm

//Tạo ra hàm nhân
function createMultiplier(factor: number) {
    return function (number: number) {
        return number * factor
    }
}

//VD : tạo hàm nhân đôi
const double = createMultiplier(2)
console.log(double(10));

const triple = createMultiplier(3)
console.log(triple(3));

//Tạo ra 1 hệ thống đồng bộ dữ liệu
//1. Mình có 1 object gốc
//2. Dùng keyof typeof để lấy danh sách key của nó
//3. Dùng record để bắt buộc 1 object khác có key y hệt object gốc

const ORDER_STATUS = {
    CREATED: 'orderCreated',
    PAID: 'orderPaid',
    SHIPPED: 'orderShipped'
} as const

type StatusKey = keyof typeof ORDER_STATUS

const STATUS_COLOR: Record<StatusKey, string> = {
    CREATED: 'gray',
    PAID: 'blue',
    SHIPPED: 'green'
}

function getBadgeColor(status: StatusKey) {
    return STATUS_COLOR[status]
}
getBadgeColor('CREATED')

const ENV_LIST = {
    DEV: 'development',
    STAGING: 'staging',
    PROD: 'prod'
} as const

type EnvKey = keyof typeof ENV_LIST
interface EnvConfig {
    baseUrl: string;
    retries: number;
    timeOut: number
}

const PLAYWRIGHT_CONFIG: Record<EnvKey, EnvConfig> = {
    DEV: {
        baseUrl: 'dev',
        retries: 0,
        timeOut: 300
    },
    STAGING: {
        baseUrl: 'uat',
        retries: 0,
        timeOut: 100

    },
    PROD: {
        baseUrl: 'prod',
        retries: 1,
        timeOut: 200
    }
}

PLAYWRIGHT_CONFIG['PROD']

const MEMBERSHIP_TIER = {
    STD: 'standard_user',
    GOLD: 'gold_user',
    VIP: 'vip_user'
} as const

type TierKey = keyof typeof MEMBERSHIP_TIER
type FeeConfig = Record<TierKey, number>
//Phần closure : tạo nhà máy hàm
function createFeeCalculator(config: FeeConfig) {
    console.log('Khoi tao bo tinh phi voi config');

    //closure
    return (tier: TierKey, amount: number): number => {
        const rate = config[tier]
        const fee = rate * amount
        console.log(`${tier} giao dich ${amount}: Phi ${fee}`);
        return fee
    }
}

const giangSinhConfig: FeeConfig = {
    STD: 0.05,
    GOLD: 0.02,
    VIP: 0.0
}

const tetConfig: FeeConfig = {
    STD: 0.1,
    GOLD: 0.05,
    VIP: 0.01
}

const calculateGiangSinh = createFeeCalculator(giangSinhConfig)
const calculateTet = createFeeCalculator(tetConfig)

calculateGiangSinh('GOLD', 100)
calculateGiangSinh('VIP', 500)


type LyNuoc = string
//Viết 1 hàm nhận vào menu trả về 1 cái nút bấm cho menu
function caiDatMayBanNuoc<T extends Record<string, string | (() => LyNuoc)>>(menu: T): (tenMon: keyof T) => LyNuoc {
    //Nút bấm trả về
    return (tenMon: keyof T): LyNuoc => {
        const congThuc = menu[tenMon]
        if (typeof congThuc === 'function') {
            console.log(`May dang pha che mon ${String(tenMon)}`);
            return congThuc()
        }
        console.log(`Lay ngay mon co san ${String(tenMon)}`);
        return congThuc
    }
}

const MENU_QUAN = {
    cocacola: 'Lon coca uop lanh',
    sinh_to_bo: () => {
        return 'Xay bo + sua + da'
    },
    cafe_sua : 'Cafe pha phin'

} as const

const bamNut = caiDatMayBanNuoc(MENU_QUAN)
const nc1 = bamNut('cocacola')
const nc2 = bamNut('sinh_to_bo')
