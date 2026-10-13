# Pipeline Plan — bank-portal

## ۱. مراحل CI

| # | مرحله | دستور | چه خطایی رو پیدا می‌کنه؟ |
|---|---|---|---|
| ① | Checkout | (دستور npm نداره، کار GitHub است) | اگر این مرحله نباشه، سیستم CI اصلاً **کد پروژه** رو نداره و هیچ مرحله‌ی بعدی نمی‌تونه اجرا بشه |
| ② | Install | `npm ci` | پکیجی که در `package-lock.json` نیست یا با `package.json` نمی‌خونه |
| ③ | Lint | `npm run lint` | نقض قوانین کیفیت کد: متغیر بی‌استفاده، dependency اشتباه در Hookها و... |
| ④ | Test | (فعلاً نداریم، بعداً اضافه می‌کنیم) | منطق اشتباه کد |
| ⑤ | Build | `npm run build` | خطاهای **کامپایل و تایپ** (TypeScript) یا importهای خراب |

**چرا Lint قبل از Build است؟**
چون Lint سریع‌تر است و Build بیشتر طول می‌کشد. پس اگر خطا وجود داشته باشه، سریع‌تر خبر میده.
اصل کلی: **Fail Fast**، یعنی مرحله‌های سریع و ارزان اول اجرا بشن.

## ۲. Continuous Delivery یا Continuous Deployment؟

**Continuous Delivery**، چون پروژه حساسه و نیاز به تأیید دستی داره.

## ۳. تفاوت CI با لپ‌تاپ من

فایل `.env` در `.gitignore` است، پس روی GitHub **نیست**. CI کد رو از GitHub می‌گیره، پس فایل **`.env`** رو نداره.
Prisma برای کار کردن به **`DATABASE_URL`** (آدرس دیتابیس) نیاز داره، پس هر مرحله‌ای که به Prisma یا متغیرهای `.env` وابسته باشه (مثلاً `prisma generate` یا build) ممکنه در CI **Fail** بشه.
راه‌حل در مرحله‌ی ۶ دوره: **GitHub Secrets**.

## ۴. Warning یا Error؟

خروجی `npm run lint`: دو **warning**، صفر error.
خروجی `echo $?`: **`0`**
پس در CI مرحله‌ی Lint **Pass** میشه.

نتیجه: warningها CI رو متوقف **نمی‌کنن** و ممکنه به مرور در پروژه جمع بشن.
اگر تیم بخواد warningها هم باعث Fail بشن، می‌تونه از `eslint --max-warnings=0` استفاده کنه.

## ۵. پرسش و پاسخ — Lesson 1

**۱. سارا روی لپ‌تاپ خودش `npm run build` زده و موفق بوده، ولی در CI همون build Fail میشه. چرا؟**
- فایل `.env` در CI وجود نداره، پس متغیرهایی مثل `DATABASE_URL` تعریف نشدن.
- روی لپ‌تاپ سارا پکیجی نصب شده که در `package-lock.json` ثبت نشده. `npm ci` در CI فقط چیزهایی رو نصب می‌کنه که داخل lock file هستن.

**۲. اسکریپتی که خطا رو چاپ می‌کنه ولی با exit code `0` تموم میشه؟**
CI این مرحله رو **Pass** حساب می‌کنه. این خطرناکه، چون Pipeline سبز نشون داده میشه در حالی که کد خرابه (**False Positive**).

**۳. وقتی همه‌ی تست‌ها پاس میشن، چرا مستقیم روی Production deploy نکنیم؟**
تست‌ها فقط چیزهایی رو بررسی می‌کنن که براشون تست نوشتیم. در یک سیستم بانکی، هزینه‌ی خطایی که تست‌ها نمی‌گیرن خیلی بالاست، پس یک تأیید انسانی قبل از Production ارزشش رو داره.

**۴. تفاوت `npm ci` و `npm install`؟**
`npm ci` دقیقاً همون نسخه‌هایی رو نصب می‌کنه که در `package-lock.json` هستن و هیچ‌وقت اون فایل رو تغییر نمیده. `npm install` ممکنه نسخه‌ها رو آپدیت کنه. در CI به **تکرارپذیری** نیاز داریم، یعنی هر بار دقیقاً همون نتیجه.

## ✅ جمع‌بندی Lesson 1

| | |
|---|---|
| ✅ چه چیزهایی یاد گرفتم | CI، Continuous Delivery، Continuous Deployment، Pipeline، Fail Fast |
| 🧠 چه مفاهیمی باید بلد باشم | exit code، `npm ci`، چرا `.env` در CI وجود نداره |
| 🛠 چه چیزی پیاده‌سازی کردم | طرح Pipeline برای bank-portal (همین فایل) |
| ❓ هنوز نیاز به تمرین دارد | مسئله‌ی `.env` و Secrets (در مرحله‌ی ۶ کامل میشه) |

---

# 📋 خلاصه: CD، Staging، Production و Rollback (Lesson 9 و 10)

## 🎯 CD Pipeline (Lesson 9)

بعد از Merge، کد **خودکار** روی سرور میره.

| بخش | چی ساختیم |
|---|---|
| 🗄️ دیتابیس | PostgreSQL روی **Neon** (Frankfurt، با `sslmode=require`) |
| 🖥️ سرور | **Render** که Image رو از GHCR اجرا می‌کنه |
| 🔄 Migration | `prisma migrate deploy` در CI، **نه** `migrate dev` |
| 🚀 Deploy | `curl -f` به **Deploy Hook** با `imgURL=...:<sha>` |

**نکات کلیدی:**
- ترتیب: `docker` ← `migrate` ← `deploy`. هرگز دیتابیس جدید با کد قدیمی
- `if: github.event_name == 'push'`: PRها به Production دست نمی‌زنن
- `curl -f`: بدون اون، خطای HTTP باعث **سبز کاذب** میشه
- Secret ناموجود = **رشته‌ی خالی**، نه خطا
- Skipped ≠ اجرا شده
- `migrate deploy` **Idempotent** است: اجرای چندباره‌اش بی‌خطره

## 🎯 Staging و Production (Lesson 10)

Staging = تمرین لباس 🎭. **همون Image** اول روی Staging، بعد با **تأیید انسان** روی Production.

```
docker ──→ 🧪 deploy-staging ──→ 👤 Approval ──→ 🌍 deploy-production
              (migrate + deploy)                    (migrate + deploy)
```

| | Staging 🧪 | Production 🌍 |
|---|---|---|
| Neon branch | `staging` (schema only) | `production` |
| Render | `bank-portal-staging` | `bank-portal` |
| GitHub Environment | `staging` | `production` |
| Required reviewers | ❌ خودکار | ✅ خودم |
| Deployment branches | فقط `main` | فقط `main` |
| `AUTH_SECRET` | مخصوص خودش | مخصوص خودش |

**نکات کلیدی:**
- **Environment Secrets:** اسم یکسان (`DATABASE_URL`)، مقدار متفاوت برای هر محیط
- ⚠️ هرگز Secret هم‌نام در سطح **ریپو** و **Environment** نذار. اگه Secret محیط حذف بشه، بی‌صدا به Secret ریپو برمی‌گرده
- **یک Job برای هر محیط**: هر Job با Environment محافظت‌شده **جداگانه** Approval می‌خواد
- `needs: [deploy-staging]`: Production فقط بعد از **موفقیت** Staging
- **Allow administrators to bypass** رو برای Production خاموش کن
- این یعنی **Continuous Delivery**، همون انتخاب Lesson 1 برای بانک ✅

## 🎯 Rollback و درس‌های Production

`.github/workflows/rollback.yml`:
```yaml
on:
  workflow_dispatch:
    inputs:
      sha: ...
jobs:
  rollback:
    environment: production
    steps: curl -f ... imgURL=...:${{ inputs.sha }}
```

- **بدون build جدید.** فقط Image قبلی از GHCR. حدود ۱ دقیقه ⚡
- **هرگز Migration اجرا نمی‌کنه.** کد برمی‌گرده، دیتابیس **نه**
- Migrationها رو **Backward-compatible** بنویس: اضافه کردن ✅، حذف یا تغییر اسم ⚠️ (الگوی Expand / Contract)
- **اول خونریزی رو متوقف کن** (Rollback)، بعد علت رو پیدا کن (Fix Forward)
- **قانون حادثه:** بعد از Rollback، Deploymentهای **منتظر** رو Reject کن
- **منبع حقیقت = Render**، نه لیست Deploymentهای GitHub

## 🏗️ Pipeline نهایی

```
PR:   lint ∥ typecheck ∥ test ──→ build ∥ docker (build only)        🛡️ Ruleset: ۵ Check الزامی
main: ... ──→ docker (push :latest + :sha) ──→ 🧪 staging ──→ 👤 ──→ 🌍 production
دستی: Rollback Production (هر SHA دلخواه) ⏪⏩
```

## ❓ باقی‌مونده برای Lesson 11

- تکرار در `deploy-staging` و `deploy-production` ← **Reusable Workflows**
- Deploy هم‌زمان با دو Merge پشت سر هم ← **Concurrency**
- `docker` در CI هر بار از صفر build می‌کنه ← **Buildx GHA Cache**
- هشدار `SecretsUsedInArgOrEnv` ← **BuildKit secrets**
- امنیت وابستگی‌ها ← **Dependabot** و **Permissions**
