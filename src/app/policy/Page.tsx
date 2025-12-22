import Container from '@/components/UI/Container'

const POLICIES = [
  {
    title: '1. Information Collection',
    desc: [
      'Prime Vaults may collect limited information necessary to operate the service, including:',
      'On-chain wallet addresses.',
      'Transaction history related to vault participation.',
      'Technical data (e.g., IP, device details) for security purposes.',
    ],
  },
  {
    title: '2. Use of Information',
    desc: [
      'Collected information is used to:',
      'Operate and improve the platform.',
      'Enhance user experience and performance optimization.',
      'Comply with legal or regulatory requirements where applicable.',
    ],
  },
  {
    title: '3. Data Security',
    desc: [
      'Prime Vaults applies industry-standard security practices, including smart contract audits and continuous monitoring. However, no system can guarantee 100% protection against external threats. Users should participate with full awareness of inherent risks.',
    ],
  },
  {
    title: '4. Data Sharing',
    desc: [
      'Prime Vaults does not sell or trade user data. Data may be shared only with trusted partners such as auditors, security providers, or legal entities when necessary.',
    ],
  },
  {
    title: '5. User Control',
    desc: [
      'Users always retain control over their wallets and private keys. Prime Vaults never stores or requests access to private keys.',
    ],
  },
  {
    title: '6. Policy Updates',
    desc: [
      'This Privacy Policy may be updated from time to time. Any changes will be published, and continued use of the service implies acceptance of those updates.',
    ],
  },
]

export default function PolicyPage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="flex flex-col px-4 md:px-8 py-8 md:py-16 bg-[#141510] gap-4 md:gap-7 font-medium">
        <div className="flex flex-col gap-2">
          <span className="text-[40px] text-[#FCFCFD]">
            Privacy Policy – Prime Vaults
          </span>
          <p className="text-[#ABB1BA]">Version dated Sep 18, 2025</p>
        </div>
        {POLICIES.map((term, idx) => (
          <div key={idx} className="flex flex-col gap-2 text-sm md:text-base">
            <h5 className="text-[#FCFCFD] uppercase">{term.title}</h5>
            {term.desc.map((desc, idx) => (
              <p key={idx} className="text-[#ABB1BA]">
                {desc}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Container>
  )
}
