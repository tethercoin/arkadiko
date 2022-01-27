
// node proposal-emergency-shutdown.js
require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();
const BN = require('bn.js');

async function transact() {
  const list = tx.listCV([
    tx.tupleCV({ 'to': tx.uintCV(1675), 'ustx': tx.uintCV(1793981) }),
    tx.tupleCV({ 'to': tx.uintCV(1676), 'ustx': tx.uintCV(11478080) }),
    tx.tupleCV({ 'to': tx.uintCV(1677), 'ustx': tx.uintCV(108415) }),
    tx.tupleCV({ 'to': tx.uintCV(1678), 'ustx': tx.uintCV(425114) }),
    tx.tupleCV({ 'to': tx.uintCV(1679), 'ustx': tx.uintCV(19130133) }),
    tx.tupleCV({ 'to': tx.uintCV(1680), 'ustx': tx.uintCV(425114) }),
    tx.tupleCV({ 'to': tx.uintCV(1681), 'ustx': tx.uintCV(47230172) }),
    tx.tupleCV({ 'to': tx.uintCV(1682), 'ustx': tx.uintCV(1913013) }),
    tx.tupleCV({ 'to': tx.uintCV(1683), 'ustx': tx.uintCV(829651) }),
    tx.tupleCV({ 'to': tx.uintCV(1684), 'ustx': tx.uintCV(851585) }),
    tx.tupleCV({ 'to': tx.uintCV(1685), 'ustx': tx.uintCV(2125570) }),
    tx.tupleCV({ 'to': tx.uintCV(1686), 'ustx': tx.uintCV(6589268) }),
    tx.tupleCV({ 'to': tx.uintCV(1688), 'ustx': tx.uintCV(852942) }),
    tx.tupleCV({ 'to': tx.uintCV(1689), 'ustx': tx.uintCV(2125570) }),
    tx.tupleCV({ 'to': tx.uintCV(1690), 'ustx': tx.uintCV(23806) }),
    tx.tupleCV({ 'to': tx.uintCV(1694), 'ustx': tx.uintCV(1955525) }),
    tx.tupleCV({ 'to': tx.uintCV(1697), 'ustx': tx.uintCV(6397062) }),
    tx.tupleCV({ 'to': tx.uintCV(1698), 'ustx': tx.uintCV(3556767) }),
    tx.tupleCV({ 'to': tx.uintCV(1699), 'ustx': tx.uintCV(14373106) }),
    tx.tupleCV({ 'to': tx.uintCV(1700), 'ustx': tx.uintCV(10627851) }),
    tx.tupleCV({ 'to': tx.uintCV(1701), 'ustx': tx.uintCV(10627851) }),
    tx.tupleCV({ 'to': tx.uintCV(1702), 'ustx': tx.uintCV(144539) }),
    tx.tupleCV({ 'to': tx.uintCV(1703), 'ustx': tx.uintCV(584535) }),
    tx.tupleCV({ 'to': tx.uintCV(1704), 'ustx': tx.uintCV(12753422) }),
    tx.tupleCV({ 'to': tx.uintCV(1709), 'ustx': tx.uintCV(7206159) }),
    tx.tupleCV({ 'to': tx.uintCV(1710), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1711), 'ustx': tx.uintCV(510137) }),
    tx.tupleCV({ 'to': tx.uintCV(1713), 'ustx': tx.uintCV(42511) }),
    tx.tupleCV({ 'to': tx.uintCV(1714), 'ustx': tx.uintCV(10967943) }),
    tx.tupleCV({ 'to': tx.uintCV(1715), 'ustx': tx.uintCV(1827990) }),
    tx.tupleCV({ 'to': tx.uintCV(1718), 'ustx': tx.uintCV(106279) }),
    tx.tupleCV({ 'to': tx.uintCV(1719), 'ustx': tx.uintCV(15474430) }),
    tx.tupleCV({ 'to': tx.uintCV(1725), 'ustx': tx.uintCV(117542) }),
    tx.tupleCV({ 'to': tx.uintCV(1726), 'ustx': tx.uintCV(510137) }),
    tx.tupleCV({ 'to': tx.uintCV(1733), 'ustx': tx.uintCV(426763) }),
    tx.tupleCV({ 'to': tx.uintCV(1734), 'ustx': tx.uintCV(42511406) }),
    tx.tupleCV({ 'to': tx.uintCV(1735), 'ustx': tx.uintCV(119032) }),
    tx.tupleCV({ 'to': tx.uintCV(1736), 'ustx': tx.uintCV(13603650) }),
    tx.tupleCV({ 'to': tx.uintCV(1737), 'ustx': tx.uintCV(174297) }),
    tx.tupleCV({ 'to': tx.uintCV(1738), 'ustx': tx.uintCV(51014) }),
    tx.tupleCV({ 'to': tx.uintCV(1739), 'ustx': tx.uintCV(1938414) }),
    tx.tupleCV({ 'to': tx.uintCV(1740), 'ustx': tx.uintCV(909744) }),
    tx.tupleCV({ 'to': tx.uintCV(1741), 'ustx': tx.uintCV(178548) }),
    tx.tupleCV({ 'to': tx.uintCV(1744), 'ustx': tx.uintCV(1275342) }),
    tx.tupleCV({ 'to': tx.uintCV(1748), 'ustx': tx.uintCV(21256) }),
    tx.tupleCV({ 'to': tx.uintCV(1749), 'ustx': tx.uintCV(106279) }),
    tx.tupleCV({ 'to': tx.uintCV(1750), 'ustx': tx.uintCV(40281846) }),
    tx.tupleCV({ 'to': tx.uintCV(1751), 'ustx': tx.uintCV(8502) }),
    tx.tupleCV({ 'to': tx.uintCV(1752), 'ustx': tx.uintCV(743950) }),
    tx.tupleCV({ 'to': tx.uintCV(1753), 'ustx': tx.uintCV(4663501) }),
    tx.tupleCV({ 'to': tx.uintCV(1754), 'ustx': tx.uintCV(212557029) }),
    tx.tupleCV({ 'to': tx.uintCV(1755), 'ustx': tx.uintCV(6801825) }),
    tx.tupleCV({ 'to': tx.uintCV(1756), 'ustx': tx.uintCV(212557029) }),
    tx.tupleCV({ 'to': tx.uintCV(1757), 'ustx': tx.uintCV(42511406) }),
    tx.tupleCV({ 'to': tx.uintCV(1758), 'ustx': tx.uintCV(21255703) }),
    tx.tupleCV({ 'to': tx.uintCV(1759), 'ustx': tx.uintCV(1653694) }),
    tx.tupleCV({ 'to': tx.uintCV(1760), 'ustx': tx.uintCV(29332870) }),
    tx.tupleCV({ 'to': tx.uintCV(1766), 'ustx': tx.uintCV(637671) }),
    tx.tupleCV({ 'to': tx.uintCV(1767), 'ustx': tx.uintCV(722694) }),
    tx.tupleCV({ 'to': tx.uintCV(1768), 'ustx': tx.uintCV(42511) }),
    tx.tupleCV({ 'to': tx.uintCV(1769), 'ustx': tx.uintCV(13365586) }),
    tx.tupleCV({ 'to': tx.uintCV(1770), 'ustx': tx.uintCV(8502281) }),
    tx.tupleCV({ 'to': tx.uintCV(1771), 'ustx': tx.uintCV(1857748) }),
    tx.tupleCV({ 'to': tx.uintCV(1775), 'ustx': tx.uintCV(1275342) }),
    tx.tupleCV({ 'to': tx.uintCV(1776), 'ustx': tx.uintCV(42511406) }),
    tx.tupleCV({ 'to': tx.uintCV(1777), 'ustx': tx.uintCV(191301) }),
    tx.tupleCV({ 'to': tx.uintCV(1778), 'ustx': tx.uintCV(55265) }),
    tx.tupleCV({ 'to': tx.uintCV(1783), 'ustx': tx.uintCV(131785) }),
    tx.tupleCV({ 'to': tx.uintCV(1784), 'ustx': tx.uintCV(297579840) }),
    tx.tupleCV({ 'to': tx.uintCV(1785), 'ustx': tx.uintCV(4251141) }),
    tx.tupleCV({ 'to': tx.uintCV(1787), 'ustx': tx.uintCV(42511) }),
    tx.tupleCV({ 'to': tx.uintCV(1789), 'ustx': tx.uintCV(2848264) }),
    tx.tupleCV({ 'to': tx.uintCV(1790), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1791), 'ustx': tx.uintCV(8502281) }),
    tx.tupleCV({ 'to': tx.uintCV(1792), 'ustx': tx.uintCV(170046) }),
    tx.tupleCV({ 'to': tx.uintCV(1793), 'ustx': tx.uintCV(1955525) }),
    tx.tupleCV({ 'to': tx.uintCV(1794), 'ustx': tx.uintCV(63767109) }),
    tx.tupleCV({ 'to': tx.uintCV(1795), 'ustx': tx.uintCV(63767109) }),
    tx.tupleCV({ 'to': tx.uintCV(1796), 'ustx': tx.uintCV(76521) }),
    tx.tupleCV({ 'to': tx.uintCV(1797), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1798), 'ustx': tx.uintCV(935251) }),
    tx.tupleCV({ 'to': tx.uintCV(1800), 'ustx': tx.uintCV(8502281) }),
    tx.tupleCV({ 'to': tx.uintCV(1801), 'ustx': tx.uintCV(8502281) }),
    tx.tupleCV({ 'to': tx.uintCV(1802), 'ustx': tx.uintCV(2125570) }),
    tx.tupleCV({ 'to': tx.uintCV(1803), 'ustx': tx.uintCV(9862646) }),
    tx.tupleCV({ 'to': tx.uintCV(1804), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1805), 'ustx': tx.uintCV(3188355) }),
    tx.tupleCV({ 'to': tx.uintCV(1808), 'ustx': tx.uintCV(2125570) }),
    tx.tupleCV({ 'to': tx.uintCV(1809), 'ustx': tx.uintCV(10627851) }),
    tx.tupleCV({ 'to': tx.uintCV(1811), 'ustx': tx.uintCV(85023) }),
    tx.tupleCV({ 'to': tx.uintCV(1812), 'ustx': tx.uintCV(973511) }),
    tx.tupleCV({ 'to': tx.uintCV(1813), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1814), 'ustx': tx.uintCV(59516) }),
    tx.tupleCV({ 'to': tx.uintCV(1815), 'ustx': tx.uintCV(127534) }),
    tx.tupleCV({ 'to': tx.uintCV(1816), 'ustx': tx.uintCV(8502281) }),
    tx.tupleCV({ 'to': tx.uintCV(1818), 'ustx': tx.uintCV(104067921) }),
    tx.tupleCV({ 'to': tx.uintCV(1824), 'ustx': tx.uintCV(6172656) }),
    tx.tupleCV({ 'to': tx.uintCV(1825), 'ustx': tx.uintCV(4251141) }),
    tx.tupleCV({ 'to': tx.uintCV(1826), 'ustx': tx.uintCV(272073) }),
    tx.tupleCV({ 'to': tx.uintCV(1827), 'ustx': tx.uintCV(59516) }),
    tx.tupleCV({ 'to': tx.uintCV(1828), 'ustx': tx.uintCV(4527465) }),
    tx.tupleCV({ 'to': tx.uintCV(1829), 'ustx': tx.uintCV(637671) }),
    tx.tupleCV({ 'to': tx.uintCV(1835), 'ustx': tx.uintCV(1917264) }),
    tx.tupleCV({ 'to': tx.uintCV(1836), 'ustx': tx.uintCV(106279) }),
    tx.tupleCV({ 'to': tx.uintCV(1837), 'ustx': tx.uintCV(21256) }),
    tx.tupleCV({ 'to': tx.uintCV(1838), 'ustx': tx.uintCV(284826) }),
    tx.tupleCV({ 'to': tx.uintCV(1840), 'ustx': tx.uintCV(850228) }),
    tx.tupleCV({ 'to': tx.uintCV(1843), 'ustx': tx.uintCV(21256) }),
    tx.tupleCV({ 'to': tx.uintCV(1844), 'ustx': tx.uintCV(8208952) }),
    tx.tupleCV({ 'to': tx.uintCV(1845), 'ustx': tx.uintCV(1564420) }),
    tx.tupleCV({ 'to': tx.uintCV(1846), 'ustx': tx.uintCV(8502) }),
    tx.tupleCV({ 'to': tx.uintCV(1847), 'ustx': tx.uintCV(85023) }),
    tx.tupleCV({ 'to': tx.uintCV(1848), 'ustx': tx.uintCV(850228) }),
    tx.tupleCV({ 'to': tx.uintCV(1849), 'ustx': tx.uintCV(63767) }),
    tx.tupleCV({ 'to': tx.uintCV(1850), 'ustx': tx.uintCV(2125570) }),
    tx.tupleCV({ 'to': tx.uintCV(1852), 'ustx': tx.uintCV(11673632) }),
    tx.tupleCV({ 'to': tx.uintCV(1853), 'ustx': tx.uintCV(17004562) }),
    tx.tupleCV({ 'to': tx.uintCV(1854), 'ustx': tx.uintCV(255068) }),
    tx.tupleCV({ 'to': tx.uintCV(1855), 'ustx': tx.uintCV(212557) }),
    tx.tupleCV({ 'to': tx.uintCV(1856), 'ustx': tx.uintCV(425114) }),
    tx.tupleCV({ 'to': tx.uintCV(1857), 'ustx': tx.uintCV(85022812) }),
    tx.tupleCV({ 'to': tx.uintCV(1858), 'ustx': tx.uintCV(1062785) }),
    tx.tupleCV({ 'to': tx.uintCV(1859), 'ustx': tx.uintCV(42511) }),    
  ]);
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'arkadiko-claim-yield-v2-1',
    functionName: 'add-claims',
    functionArgs: [list],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    fee: new BN(100000, 10),
    nonce: new BN(476, 10),
    postConditionMode: 1,
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();
