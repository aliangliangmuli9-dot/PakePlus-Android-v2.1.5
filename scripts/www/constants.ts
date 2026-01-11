
export const GRID_SIZE = 8;

export interface DifficultyConfig {
  id: 'NORMAL' | 'HELL';
  label: string;
  tileTypes: number; 
  initialTime: number;
  multiplier: number;
  color: string;
}

export const DIFFICULTIES: Record<string, DifficultyConfig> = {
  NORMAL: {
    id: 'NORMAL',
    label: "普通难度",
    tileTypes: 6,
    initialTime: 60,
    multiplier: 1,
    color: "from-blue-600 to-blue-800"
  },
  HELL: {
    id: 'HELL',
    label: "地狱难度",
    tileTypes: 9,
    initialTime: 45,
    multiplier: 3.0,
    color: "from-red-700 to-black"
  }
};

export enum GameStatus {
  LOADING,
  START,
  PLAYING,
  GAME_OVER
}

export const NORMAL_IMAGES = [
  "https://i0.hdslb.com/bfs/openplatform/352972f380b2ac968a1b9461fe4fdff0417ff028.png",
  "https://i0.hdslb.com/bfs/openplatform/76c5c99834fa0b5af3a1a82310946bc42f68b3f4.png",
  "https://i0.hdslb.com/bfs/openplatform/ef3eacabdbabbbf02fb44db40021a5b1d3cb574a.png",
  "https://i0.hdslb.com/bfs/openplatform/f66f09c3096a23066554997df29477e80b3f4d2c.png",
  "https://i0.hdslb.com/bfs/openplatform/2bfc8b51b6e3bbb5fef95ec3a19cf75a2e20e04f.png",
  "https://i0.hdslb.com/bfs/openplatform/7aa13590d2e93c8bda6aba4add600d03490b2b01.png",
  "https://i0.hdslb.com/bfs/openplatform/bdc8aecd3a93d3aae841b58229318dbc4bfb5274.png",
  "https://i0.hdslb.com/bfs/openplatform/4fc7b9799c870947a58cbb6d1a2ea49d8d321965.png",
  "https://i0.hdslb.com/bfs/openplatform/ec563535ae62330a1cfd292b1ee97302f5a3ce58.png",
  "https://i0.hdslb.com/bfs/openplatform/9a3d07b96fbdf9408c680551871a0c77e45a67c2.png",
  "https://i0.hdslb.com/bfs/openplatform/8a942709e597d8400f714359a6f0270960a19f46.png",
  "https://i0.hdslb.com/bfs/openplatform/cd1cae13bfc0b1d30e739af26a542e3fe76aa59f.png",
  "https://i0.hdslb.com/bfs/openplatform/2e20cf1bbc8725f37520b0465d8ae9bf6fe14832.png",
  "https://i0.hdslb.com/bfs/openplatform/4282a850e108dde0582ec51695a9e87d42d5886a.png",
  "https://i0.hdslb.com/bfs/openplatform/87beb5e3c3447a087591d46a146a71c9baba75b6.png",
  "https://i0.hdslb.com/bfs/openplatform/3fb6b8ea5e2328be14f3c431af115f373d108d2b.png",
  "https://i0.hdslb.com/bfs/openplatform/0c53631921d934b6d8c12d1cc9470f98f25c99f9.png",
  "https://i0.hdslb.com/bfs/openplatform/d688b469edf6deee0ff36edea4eaf942c814d5eb.png",
  "https://i0.hdslb.com/bfs/openplatform/884c2f45943d708ee9cfa7ea965c2a88d9a2ffa7.png",
  "https://i0.hdslb.com/bfs/openplatform/05facb4283955c99ade484ce41c1235a77565286.png",
  "https://i0.hdslb.com/bfs/openplatform/4f1b58847931a8f547f92e5d4b90292edafb64ac.png",
  "https://i0.hdslb.com/bfs/openplatform/eb5406e627aa5edf654ba48d77b5ff19c55f60ad.png",
  "https://i0.hdslb.com/bfs/openplatform/28b5872a233bc650ba9f8333769b7bd3987a0827.png",
  "https://i0.hdslb.com/bfs/openplatform/f18357363805667986f7eccc4c9dee674c03c243.png",
  "https://i0.hdslb.com/bfs/openplatform/906356c3555c3102d19d174cb097e8621bc1a641.png",
  "https://i0.hdslb.com/bfs/openplatform/8f60a8a7a823ef84dd32466f6d0d3adcbc510ca5.png",
  "https://i0.hdslb.com/bfs/openplatform/86e93534f50d009eab554cc9b897917780b98b76.png",
  "https://i0.hdslb.com/bfs/openplatform/f193116429182d1327d362e9acaa08ea6e1f9541.png",
  "https://i0.hdslb.com/bfs/openplatform/e767261dcef81d7770265037b45737bd34652a42.png",
  "https://i0.hdslb.com/bfs/openplatform/12b4200c2d340f256bcb927fc961672f671c8045.png",
  "https://i0.hdslb.com/bfs/openplatform/278da256907e586088b243ed451b042f21a68785.png",
  "https://i0.hdslb.com/bfs/openplatform/b9e7b79bdb4c8893f4562af2f1d9a87b206ef773.png",
  "https://i0.hdslb.com/bfs/openplatform/e90e18996ad823d4c8c3c0b4c7337507ec52c307.png",
  "https://i0.hdslb.com/bfs/openplatform/b3da82153d336b13513cbe73d1733ef623955925.png",
  "https://i0.hdslb.com/bfs/openplatform/ef3b72dc1eb19cacca232ce9185a9302a5f4fcd3.png",
  "https://i0.hdslb.com/bfs/openplatform/4011f6b3352d3478432a528ff3155ae7f8752bc7.png",
  "https://i0.hdslb.com/bfs/openplatform/ac3d1913283f37b5217adec8919dcd3d4b5a641e.png",
  "https://i0.hdslb.com/bfs/openplatform/9aa32fec42fb86fd20b21967c01eebabd0c1c611.png",
  "https://i0.hdslb.com/bfs/openplatform/3aff98dc1b36a8e78e9323ad13a036d117ad6979.png",
  "https://i0.hdslb.com/bfs/openplatform/7626b57f769d20ba09424de605b30e011e2c018e.png",
  "https://i0.hdslb.com/bfs/openplatform/8ea79786ca03e6d8635e755a9c6280cf58d9e175.png",
  "https://i0.hdslb.com/bfs/openplatform/a42b90fa860d91f9b3054ea704762c17d653f0ae.png",
  "https://i0.hdslb.com/bfs/openplatform/da84615060dc32aba918cfeddfa708346224483f.png",
  "https://i0.hdslb.com/bfs/openplatform/68d479d9c3399ee883b6b87831a171ccb4a5a977.png",
  "https://i0.hdslb.com/bfs/openplatform/695898d6c94226c201e6d2277598d27b1a9af930.png"
];

export const HELL_IMAGES = [
  "https://i0.hdslb.com/bfs/openplatform/d796d657559c53863955c289896e845a08318601.png",
  "https://i0.hdslb.com/bfs/openplatform/05b716ed261418607fe79106af326554ba3207c7.png",
  "https://i0.hdslb.com/bfs/openplatform/38a9e0492cbd9b203ba453df6854e04aca96c411.png",
  "https://i0.hdslb.com/bfs/openplatform/244248473e6b2ed38bfad7ebdc81931337af2f34.png",
  "https://i0.hdslb.com/bfs/openplatform/97b809a7e857495d8a34a883c79bb98a32986976.png",
  "https://i0.hdslb.com/bfs/openplatform/0f4d32ce3edc41c5bdce9ef423c486b91d23a296.png",
  "https://i0.hdslb.com/bfs/openplatform/b0d5dc3fc895426f848c3bb2a16da8a9ded2338b.png",
  "https://i0.hdslb.com/bfs/openplatform/84a8a5891037fb67de0f532c01043d3295850776.png",
  "https://i0.hdslb.com/bfs/openplatform/f13eb56fcdcbc7a87b35ca9f5b255b7b8ac5143b.png",
  "https://i0.hdslb.com/bfs/openplatform/73cac09afe1e1ab03e0304331b5bfe1ff8dce533.png",
  "https://i0.hdslb.com/bfs/openplatform/c293db100649b1f32c561e7650c265f3818ee030.png",
  "https://i0.hdslb.com/bfs/openplatform/801a0d19ba793045ef5ab74fda1b8b120c682841.png",
  "https://i0.hdslb.com/bfs/openplatform/5e2f669cb350c576f62b77090a0b6d328b728826.png",
  "https://i0.hdslb.com/bfs/openplatform/92214485a74d10da2a082c9887f4b6285fb1de79.png",
  "https://i0.hdslb.com/bfs/openplatform/c85b93de9f0973723c190c74c69054ad6f479f42.png",
  "https://i0.hdslb.com/bfs/openplatform/424b2043e8413b950b4062114d2488ba4024dc16.png",
  "https://i0.hdslb.com/bfs/openplatform/e82b9202ddbd2434031ee274a4743b7bb9657e77.png",
  "https://i0.hdslb.com/bfs/openplatform/7a3c61d13b246b7887dda55a220ff4a7e151b1b1.png",
  "https://i0.hdslb.com/bfs/openplatform/2bf8c62a495e99e9d45571d4dcabc8da599a4223.png",
  "https://i0.hdslb.com/bfs/openplatform/b16523380330ac0448a2a4500475f23fc52173b2.png",
  "https://i0.hdslb.com/bfs/openplatform/9c2526af85af4978981fb80e24ea10c2c4c0b3b5.png",
  "https://i0.hdslb.com/bfs/openplatform/bd95bec144d6ed8711ebc6af75aa897dddd591c8.png",
  "https://i0.hdslb.com/bfs/openplatform/dfa48cd507c7da43fe8c536b6e817c13a10f9d70.png",
  "https://i0.hdslb.com/bfs/openplatform/422af598ad8e49099007f8663b90f36b92ea9f41.png",
  "https://i0.hdslb.com/bfs/openplatform/c5f1db285f981c8522cc4cd973672a02c4d15239.png",
  "https://i0.hdslb.com/bfs/openplatform/9380e8abba22aa24c5dc4a6536734e64c574945a.png",
  "https://i0.hdslb.com/bfs/openplatform/7250f421c37c92f2f821df990b528d6a932852da.png",
  "https://i0.hdslb.com/bfs/openplatform/30fc5c65e4aae15f50e24624dd51875c4de0f249.png",
  "https://i0.hdslb.com/bfs/openplatform/81ef705a7886f54582ccf6be4cee3c0e0f0248ee.png",
  "https://i0.hdslb.com/bfs/openplatform/077d493f8ce1eff6cbe261079fbaa72426d4d8c6.png",
  "https://i0.hdslb.com/bfs/openplatform/135189157ca21f574e3a3f0e7c5ad144ef4d8d65.png",
  "https://i0.hdslb.com/bfs/openplatform/b3d8a81985109950f3823ed33e2ec5024726edfd.png",
  "https://i0.hdslb.com/bfs/openplatform/c1cfce1e5ed785a8fef8e819e6feca0899cadd70.png",
  "https://i0.hdslb.com/bfs/openplatform/b44b45b95904300f83102b9b5579b651589f7dcb.png",
  "https://i0.hdslb.com/bfs/openplatform/811783c18a678f88f17c3a4f784fa1673f8ec334.png",
  "https://i0.hdslb.com/bfs/openplatform/031cfac8e3f0ae75883108536bb74d313cf74bd6.png",
  "https://i0.hdslb.com/bfs/openplatform/29ebe03e5eb70c1837ca3f6ce25600c8a391bdaf.png",
  "https://i0.hdslb.com/bfs/openplatform/f142c11661dff0bbf65dfabb5c845c665160436f.png",
  "https://i0.hdslb.com/bfs/openplatform/303b176a4ec0bf66f6b1153b906783073ca51cd1.png",
  "https://i0.hdslb.com/bfs/openplatform/a975f0e4e5501cb01210a30f30625fdb94521f42.png",
  "https://i0.hdslb.com/bfs/openplatform/e351096913dfa73977d43b36d47632268d5c44cf.png",
  "https://i0.hdslb.com/bfs/openplatform/e0cc30bc9a939b37588ce69d45405b46295e5e79.png",
  "https://i0.hdslb.com/bfs/openplatform/93fe21a2faf9aa0095d86910c019f890eb533044.png",
  "https://i0.hdslb.com/bfs/openplatform/a4372dbe8b72a0fbec5c5f63dcceb08db6533e0a.png",
  "https://i0.hdslb.com/bfs/openplatform/40ecdd243a52f3ba9a7ed61b0dbd7417cc61911f.png"
];
