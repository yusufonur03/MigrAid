# Proje Kapsam Dokümantasyonu

## Giriş ve Problem Tanımı

Yeni bir ülkeye göç etmek, bireyler için heyecan verici olduğu kadar birçok zorluğu da beraberinde getiren karmaşık bir süreçtir. Dil engelleri, kültürel farklılıklar, bürokratik işlemler, iş bulma ve sosyal çevre edinme gibi konular, göçmenlerin adaptasyon süreçlerini olumsuz etkileyebilmekte ve entegrasyonlarını geciktirebilmektedir. Bilgiye erişimdeki zorluklar ve doğru yönlendirme eksikliği, bu sorunları daha da derinleştirmektedir. Projemiz, bu temel problemleri adresleyerek göçmenlerin yeni yaşamlarına daha hızlı ve sorunsuz bir şekilde uyum sağlamalarına yardımcı olmayı hedeflemektedir.

## Projenin Amacı

Bu projenin temel amacı, göçmenlerin yeni bir ülkeye adaptasyon süreçlerini kolaylaştırmak ve onlara çeşitli konularda destek sağlamaktır. Proje, göçmenlerin bilgiye erişimini artırmayı, sosyal entegrasyonlarını teşvik etmeyi ve günlük yaşamlarında karşılaştıkları zorlukları aşmalarına yardımcı olmayı hedeflemektedir. Nihai amaç, göçmenlerin kendilerini daha güvende hissetmelerini, topluma daha hızlı entegre olmalarını ve potansiyellerini tam olarak kullanabilmelerini sağlamaktır.

## Hedef Kitle

Projenin birincil hedef kitlesi, yeni bir ülkeye göç etmiş veya göç etmeyi planlayan bireylerdir. Bu kitle, farklı yaş gruplarından, eğitim seviyelerinden ve mesleki deneyimlerden gelen göçmenleri kapsamaktadır.

## Yaklaşım ve Çözüm Önerisi

Problem tanımında belirtilen zorlukların üstesinden gelmek için, kullanıcı dostu, erişilebilir ve kapsamlı bir dijital platform geliştirmeyi öneriyoruz. Yaklaşımımız, teknolojiyi kullanarak göçmenlere ihtiyaç duydukları bilgi ve hizmetleri tek bir merkezden sunmaktır. Google Generative AI gibi yapay zeka teknolojileri, kişiselleştirilmiş destek ve anlık yardım sağlayarak platformun etkinliğini artıracaktır. Platform, web tabanlı olacak ve mobil uyumlu bir arayüz sunacaktır.

## Temel Fonksiyonlar

Proje, göçmenlere yönelik çeşitli temel fonksiyonlar sunmaktadır:

- **Sohbet Asistanı:** Yapay zekâ destekli, doğal dilde anlık rehberlik ve destek sağlayan interaktif bir sohbet arayüzü. Kullanıcılar sorularını sorabilir ve hızlı yanıtlar alabilirler.
- **Kültürel Rehberlik:** Yeni ülkenin kültürü, gelenekleri, sosyal normları, görgü kuralları, deyim-atasözü ve iletişim tavsiyeleri hakkında kapsamlı bilgi sunar. Kullanıcılar kültürel farklılıkları daha iyi anlayabilirler.
- **Resmi Belge Yardımı:** Göçmenlerin resmi belgeleri (PDF formatında) anlamalarına, doldurmalarına ve ilgili kurumlara sunmalarına yardımcı olur. Kullanıcılar belge yükleyebilir ve belge içeriği hakkında yapay zeka ile sohbet edebilirler.
- **Yol Haritası:** Adaptasyon sürecinde izlenebilecek kişiselleştirilmiş adımları ve faydalı kaynakları gösteren bir rehberlik sunar. Kullanıcının arka planı ve hedeflerine göre özel bir yol haritası oluşturulur.
- **Beceriye Göre İş Eşleştirme:** Göçmenlerin sahip oldukları niteliklere ve deneyimlere en uygun iş fırsatlarını ve potansiyel firmaları bulmalarına yardımcı olur. Kullanıcıların beceri ve deneyim girdilerine göre akıllı iş ve firma önerileri sunulur.
- **Dijital Ajanda:** Göçmenlerin önemli randevuları, tarihleri ve kişisel görevlerini takip etmeleri için kullanımı kolay bir kişisel ajanda aracı sağlar.
- **E-Hizmetler:** Çeşitli online kamu ve özel sektör hizmetlerine erişim ve kullanım konularında rehberlik sunar.
- **Eğitim ve Dil Fırsatları:** Yeni ülkedeki eğitim kurumları, kurslar ve dil öğrenme fırsatları hakkında güncel bilgiler sağlar.
- **Kurumlar, Firmalar ve Belediyeler Bilgisi:** Göçmenlerin ihtiyaç duyabileceği kamu kurumları, özel sektör firmaları ve yerel belediyeler hakkında iletişim bilgileri ve sundukları hizmetler hakkında bilgi verir.

## Proje Yapısı

Proje, temel olarak üç ana bileşenden oluşacaktır:

- **Frontend (Kullanıcı Arayüzü):** React kullanılarak geliştirilecek, kullanıcıların platformla etkileşime girdiği web arayüzüdür. React Router DOM ile sayfa yönlendirmeleri ve React Icons ile ikonografi sağlanacaktır. Vite, build aracı olarak kullanılacaktır.
- **Backend (Sunucu Tarafı Mantığı):** Node.js ve Express.js kullanılarak geliştirilecek API sunucusudur. Firebase Admin SDK ile Firebase servisleriyle (veritabanı, kimlik doğrulama) entegrasyon, Google Generative AI SDK ile yapay zeka özelliklerinin entegrasyonu sağlanacaktır. CORS, dotenv, multer (dosya yükleme için), uuid (benzersiz ID'ler için) gibi yardımcı kütüphaneler kullanılacaktır.
- **Veritabanı ve Kimlik Doğrulama:** Firebase platformunun Firestore (gerçek zamanlı veritabanı) ve Authentication (kimlik doğrulama) servisleri kullanılacaktır.
- **Yapay Zeka Entegrasyonu:** Sohbet asistanı ve potansiyel olarak diğer kişiselleştirilmiş yardım özellikleri için Google Generative AI kullanılacaktır.

## Teknik Gereksinimler ve Detaylar

Projenin geliştirilmesi ve çalıştırılması için aşağıdaki teknolojiler ve araçlar kullanılacaktır:

- **Backend:**
    - Programlama Dili/Framework: Node.js, Express.js
    - Veritabanı Erişimi: Firebase Admin SDK
    - Yapay Zeka Entegrasyonu: Google Generative AI SDK
    - Diğer Kütüphaneler: CORS, dotenv, multer, uuid
- **Frontend:**
    - Kütüphane/Framework: React
    - Yönlendirme: React Router DOM
    - Veritabanı/Backend Erişimi: Firebase SDK (istemci tarafı)
    - İkonlar: React Icons
    - Build Aracı: Vite
- **Veritabanı:** Firebase (Firestore Gerçek Zamanlı Veritabanı, Firebase Authentication)
- **Yapay Zeka:** Google Generative AI
- **Sürüm Kontrolü:** Git, GitHub (veya benzeri)
- **Geliştirme Ortamı:** VS Code (veya tercih edilen IDE)
- **Teknik Detaylar:**
    Proje, modüler bir yapıda geliştirilecektir. Backend, RESTful API prensiplerine uygun olarak tasarlanacak ve frontend ile JSON formatında veri alışverişi yapacaktır. Firebase Authentication, kullanıcıların güvenli bir şekilde kaydolmasını ve giriş yapmasını sağlayacaktır. Firestore, kullanıcı profilleri, iş ilanları, rehberlik içerikleri gibi verileri depolayacaktır. Google Generative AI, sohbet asistanı aracılığıyla doğal dil işleme yetenekleri sunarak kullanıcı sorularına anlık ve bağlamsal yanıtlar üretecektir.

## Kurulum Adımları (Genel)

Detaylı kurulum adımları projenin README.md dosyasında yer alacaktır. Genel adımlar aşağıdaki gibi olacaktır:

- **Önkoşullar:**
    - Node.js ve npm (veya yarn) yüklü olmalıdır.
    - Firebase projesi oluşturulmuş ve konfigürasyon bilgileri alınmış olmalıdır.
    - Google Cloud projesi oluşturulmuş ve Generative AI API anahtarı alınmış olmalıdır.
- **Backend Kurulumu:**
    - Proje klonlanır: `git clone [repo-url]`
    - Backend dizinine geçilir: `cd backend`
    - Bağımlılıklar yüklenir: `npm install`
    - `.env` dosyası oluşturulur ve Firebase Admin SDK konfigürasyonu ile Google Generative AI API anahtarı girilir.
    - Sunucu başlatılır: `npm start`
- **Frontend Kurulumu:**
    - Frontend dizinine geçilir: `cd frontend`
    - Bağımlılıklar yüklenir: `npm install`
    - `.env` dosyası oluşturulur ve Firebase istemci SDK konfigürasyon bilgileri girilir.
    - Geliştirme sunucusu başlatılır: `npm run dev` (Vite için)

## Kullanım Senaryoları

- **Senaryo 1: İş Arayan Göçmen (Ayşe)**
    - Ayşe, platforma kaydolur ve profilini oluşturur (deneyimleri, yetenekleri, aradığı iş türü).
    - "Beceriye Göre İş Eşleştirme" modülüne girer. Ayşe, aradığı iş türünü, deneyimlerini ve beklentilerini platforma iletir.
    - **Yapay zeka destekli iş eşleştirme algoritması**, Ayşe'nin profili, deneyimleri ve platformdaki mevcut iş ilanlarının gereksinimlerini analiz ederek ona en uygun, hatta belki de doğrudan düşünmediği ama yetkinliklerine uyan fırsatları önceliklendirerek listeler.
    - Ayşe, ilgilendiği ilanların detaylarını inceler ve başvuru yapar (veya başvuru için yönlendirilir). Gerekirse, **Yapay Zeka Sohbet Asistanı**'ndan başvuru süreci veya belirli bir iş ilanı hakkında ek bilgi ve tavsiye alabilir.
- **Senaryo 2: Kültürel Bilgi ve Resmi Belge Yardımı Arayan Göçmen (Mehmet)**
    - Mehmet, platforma giriş yapar.
    - "Kültürel Rehberlik" bölümünden yeni ülkenin sosyal normları ve gelenekleri hakkında bilgi edinir. **Yapay zeka, kültürel bilgileri anlamasına ve yorumlamasına yardımcı olur.**
    - Oturma izni başvurusu için hangi belgeleri hazırlaması gerektiğini ve başvuru formunu nasıl dolduracağını öğrenmek ister. "Resmi Belge Yardımı" bölümüne girer.
    - Burada, oturma izni için gerekli tüm belgelerin (örneğin, pasaport fotokopisi, kira kontratı, sağlık sigortası vb.) bir listesini ve her bir belgenin ne işe yaradığına dair genel açıklamaları bulur. **Yapay zeka, belge içeriğini analiz ederek bu bilgileri sunar.**
    - Başvuru formunun adım adım nasıl doldurulacağına dair detaylı bir rehbere, önemli noktalara ve sık yapılan hatalara dair uyarılara ulaşır. Gerekirse, örnek doldurulmuş formları inceler.
    - Belgelerdeki bazı resmi terimleri, yasal ifadeleri veya karmaşık cümleleri anlamakta zorlandığında, platformun entegre yapay zeka destekli 'Sohbet Asistanı'na bu terimleri sorarak anında, kendi dilinde ve bağlama uygun detaylı açıklamalar ve basitleştirilmiş yorumlar alır. Asistan, Mehmet'in özel durumuna göre ek bilgiler de sunabilir.
- **Senaryo 3: Genel Destek ve Soru Sormak İsteyen Göçmen (Fatma)**
    - Fatma, platforma giriş yapar ve doğrudan "Sohbet Asistanı"nı açar.
    - Asistana "En yakın dil kursu nerede?" veya "Sağlık sigortası başvurusu için hangi adımları izlemeliyim?" gibi spesifik sorular sorar.
    - Google Generative AI tabanlı asistan, Fatma'nın sorularını doğal dilde anlar, platformdaki ilgili kaynaklara (örneğin "Eğitim ve Dil Fırsatları" veya "Resmi Belge Yardımı" bölümleri) akıllıca yönlendirir veya doğrudan, adım adım ve kişiselleştirilmiş yanıtlar üretir. **Yapay zeka, kullanıcının sorularını anlayarak ve ilgili bilgileri sentezleyerek kişiselleştirilmiş destek sağlar.**
    - Fatma, yaklaşan konsolosluk randevusunu veya önemli bir son başvuru tarihini "Dijital Ajanda"ya kaydederken, Sohbet Asistanı'ndan bu randevu için gerekli olabilecek belgeler hakkında hatırlatma veya ek bilgi talep edebilir.

## Beklenen Çıktılar

Projenin tamamlanmasıyla aşağıdaki çıktıların elde edilmesi beklenmektedir:

- Göçmenlerin yeni ülkeye adaptasyon süreçlerinin önemli ölçüde kolaylaşması ve hızlanması.
- Kritik bilgilere (iş, barınma, sağlık, eğitim, yasal süreçler) erişimin artması ve bürokratik işlemlerin basitleşmesi.
- Göçmenlerin sosyal ve kültürel entegrasyonunun teşvik edilmesi.
- Günlük yaşamda karşılaşılan zorlukların (dil, kültürel farklılıklar, yalnızlık) üstesinden gelinmesinde etkin destek sağlanması.
- Yapay zeka destekli sohbet asistanı ile anlık ve kişiselleştirilmiş yardım imkanı sunulması.
