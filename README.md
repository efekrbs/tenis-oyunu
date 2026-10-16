# Baseline — Grand Slam Tennis

Tarayıcıda çalışan, yapay zekâya karşı tek oyunculu oynanan üç boyutlu tenis oyunu. Dört Grand Slam kortundan birini seçerek 3 veya 5 set üzerinden maç yapabilirsiniz. Oyun arayüzü İngilizcedir.

## Çalıştırma

1. Proje klasöründeki `index.html` dosyasını WebGL destekleyen bir tarayıcıda açın.
2. Ana menüden bir turnuva seçin.
3. **YOUR MATCH** alanından maç uzunluğunu belirleyin:
   - **Best of 3 sets:** 2 set kazanan maçı kazanır.
   - **Best of 5 sets:** 3 set kazanan maçı kazanır.
4. Kort hazır olduğunda **STEP ON COURT** düğmesine basın.
5. İlk servisi atmak için **Space (boşluk)** tuşuna basın.

Paket kurulumu, derleme veya internet bağlantısı gerekmez. Three.js kütüphanesi, stiller ve oyun kodu `index.html` içine gömülüdür.

İsterseniz dosyayı yerel bir HTTP sunucusuyla da açabilirsiniz. Python kuruluysa proje klasöründe şu komutu çalıştırın:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Ardından [http://127.0.0.1:8000](http://127.0.0.1:8000) adresini açın. Sunucuyu durdurmak için terminalde `Ctrl + C` kullanın.

## Kontroller

| Kontrol | İşlev |
| --- | --- |
| `W A S D` veya yön tuşları | Oyuncuyu kortta hareket ettirir. |
| `Space` | Servis atar veya raketi savurur. |
| `A / D` veya `← / →` | Servis ve vuruş sırasında topu sola veya sağa yönlendirir. |
| Vuruş sırasında `W` veya `↑` | Topu rakip sahada daha kısa bir noktaya gönderir. |
| `Esc` veya **PAUSE** | Maçı duraklatır veya devam ettirir. |
| **SOUND OFF / SOUND ON** | Oyun seslerini açar veya kapatır. Ses başlangıçta kapalıdır. |

Kendi servisiniz hazırlanırken oyuncunun konumu sabittir; sol ve sağ tuşlarla servis yönünü seçebilirsiniz. Ralli sırasında topa yaklaşın ve raket menziline girdiğinde `Space` tuşuna basın. Servis karşılanırken topun önce yere sekmesi gerekir.

Dar ekranlarda ekrandaki yön düğmeleriyle hareket edebilir, **SWING** düğmesiyle servis atabilir veya vuruş yapabilirsiniz. Sekmeden ya da pencereden ayrıldığınızda maç otomatik olarak duraklar.

## Turnuvalar ve kortlar

Kort seçimi, görünümün yanı sıra topun hızını ve sekmesini de değiştirir.

| Turnuva | Şehir | Zemin | Oynanış |
| --- | --- | --- | --- |
| Australian Open | Melbourne | Sert kort | Orta tempo |
| Roland Garros | Paris | Toprak kort | Yavaş tempo, yüksek sekme |
| Wimbledon | Londra | Çim kort | Hızlı tempo, alçak sekme |
| US Open | New York | Sert kort | Orta–hızlı tempo |

## Puanlama ve maç akışı

- Normal oyunlarda puanlar `0 → 15 → 30 → 40` şeklinde ilerler. Oyunu kazanmak için en az dört puan ve iki puan fark gerekir; eşitlikte avantaj (`AD`) uygulanır.
- Seti kazanmak için en az altı oyun ve iki oyun fark gerekir.
- Oyunlar `6–6` olduğunda tie-break oynanır. En az yedi puana iki puan farkla ulaşan oyuncu seti kazanır. Bu kural son sette de geçerlidir.
- Servis çapraz servis kutusuna düşmelidir. İlk hatadan sonra ikinci servis verilir; çift hata puanı rakibe kazandırır. Geçerli servis fileye değerse aynı servis tekrarlanır (`LET`).
- Rallide topu dışarı veya fileye göndermek puanı rakibe verir. Top ikinci kez sekmeden karşılanmalıdır.
- Skor tablosu set, oyun ve puan durumunu gösterir. Maç sonunda set sonuçlarını görebilir, **PLAY AGAIN** ile yeniden oynayabilir veya **CHOOSE ANOTHER TOURNAMENT** ile ana menüye dönebilirsiniz.

## Proje yapısı

```text
tenis oyunu/
├── index.html   # Arayüz, stiller, gömülü Three.js ve oyun mantığı
└── README.md    # Çalıştırma ve oynanış kılavuzu
```

Oyun HTML, CSS ve JavaScript ile geliştirilmiştir. Üç boyutlu çizim için Three.js, ses efektleri için Web Audio API kullanılır. `index.html` içindeki `game-code` betiğinde puanlama (`TennisScore`), kort ayarları (`TOURNAMENTS`), top fiziği ve yapay zekâ bulunur.

## Sorun giderme

- **“Court unavailable.” uyarısı:** Tarayıcınızın WebGL desteğini ve donanım hızlandırma ayarını kontrol edin. Güncel bir Chrome, Edge, Firefox veya Safari sürümüyle tekrar deneyin.
- **Ses duyulmuyor:** Üst çubuktaki **SOUND OFF** düğmesiyle sesi açın ve tarayıcı sekmesinin sessize alınmadığını kontrol edin.
- **Maç durakladı:** **RESUME MATCH** düğmesine veya `Esc` tuşuna basın. Başka bir sekmeye ya da pencereye geçmek otomatik duraklatmayı tetikler.

## Üçüncü taraf lisansı

Gömülü Three.js kütüphanesi MIT lisanslıdır. Telif ve lisans metni `index.html` içinde korunmaktadır.
