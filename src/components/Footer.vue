<script setup lang="ts">

</script>

<template>
  <div class="footer-container">
    <div class="links-block-rwd">
      <div class="links-block">
        <div class="about">
          <div class="about-title">
            關於帕恰
          </div>
          <div class="about-content">
            <ul>
              <li><a href="https://funbox.com.tw/" target="_blank">麗嬰國際官方網站</a></li>
              <li><a href="https://funbox.cyberbiz.co/" target="_blank">Funbox Toys<br>官方購物網站</a></li>
              <li><a href="https://www.popcircus.com.tw/" target="_blank">POP CIRCUS<br>星奇市官方購物網站</a></li>
            </ul>
          </div>
        </div>
        <div class="customer-service">
          <div class="customer-service-title">
            客服中心
          </div>
          <div class="customer-service-content">
            <ul>
              <li><a href="#">新手上路</a></li>
              <li><a href="#">購物FAQ</a></li>
              <li><a href="#">聯絡客服</a></li>
              <li><a href="#">會員條款</a></li>
              <li><a href="#">會員權益</a></li>
            </ul>
          </div>
        </div>
        <div class="contact">
          <div class="contact-title">
            聯絡我
          </div>
          <div class="contact-contnet">
            <div class="github-ins-btns">
              <a class="contact-icon" href="https://github.com/Minato1123" target="_blank"><icon-radix-icons-github-logo /></a>
              <a class="contact-icon" href="#"><icon-ion-logo-instagram /></a>
            </div>
            <div class="twitter-linkedin-btns">
              <a class="contact-icon" href="#"><icon-ion-logo-twitter /></a>
              <a class="contact-icon" href="#"><icon-carbon-logo-linkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="store-title-rwd">
      <div class="store-title">
        <img class="store-logo" src="../assets/images/pochacco-logo.png" alt="pochacco online store's logo">
        <div class="store-name">
          帕恰購物
        </div>
      </div>
    </div>
    <div class="company-info">
      <div class="info">
        <div class="title">
          麗嬰國際股份有限公司
        </div>
        <div class="content">
          臺北市內湖區南京東路6段346號5樓
        </div>
      </div>
      <div class="info">
        <div class="title">
          營業時間
        </div>
        <div class="content">
          週一 ～ 週五 ｜ 09：00 - 17：30
        </div>
      </div>
      <div class="info">
        <div class="title">
          客服信箱
        </div>
        <div class="content">
          service_member@letoy.com.tw
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-container {
  background-color: var(--main-color);
  width: 100%;
  height: 16rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: var(--white-color);
  font-family: 'Noto Sans TC', sans-serif;

  .links-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40rem;

    .about-title, .customer-service-title, .contact-title {
      font-weight: 400;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .about-content, .customer-service-content, .contact-contnet {
      border-bottom: 0.1rem solid var(--white-color);
      border-left: 0.1rem solid var(--white-color);
      height: 10rem;
      width: 10rem;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: flex-start;

      ul {
        padding: 0;
        margin-left: 1rem;

        li {
          list-style: none;
          font-size: 1rem;
          font-weight: 200;
          margin-top: 0.8rem;
        }
      }

      .github-ins-btns, .twitter-linkedin-btns {
        margin-bottom: 1rem;

        .contact-icon {
          border: none;
          text-decoration: none;
          margin-left: 1rem;

          .svg-icon {
            width: 2rem;
            height: 2rem;
            color: var(--white-color);

            &:hover {
              color: var(--selected-color);
            }
          }
        }
      }
    }
  }

  .store-title {
    display: flex;
    text-decoration: none;
    flex-shrink: 0;

    img {
      width: 3.2rem;
    }
    .store-name {
      margin-left: 0.6rem;
      color: var(--white-color);
      font-family: 'Noto Sans TC', sans-serif;
      font-weight: 500;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .company-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .title {
      font-weight: 400;
    }
    .content {
      font-weight: 200;
    }
  }
}

a {
  color: var(--white-color);
  text-decoration: none;

  &:hover {
    color: var(--selected-color);
    text-decoration: none;
  }
}

@media screen and (max-width: 1160px) {
  .store-title-rwd {
    display: none;
  }
}

@media screen and (max-width: 1090px) {
  .links-block-rwd {
    display: none;
  }

  .store-title-rwd {
    display: block;
  }
}

@media screen and (max-width: 560px) {
  .store-title-rwd {
    display: none;
  }
}
</style>
