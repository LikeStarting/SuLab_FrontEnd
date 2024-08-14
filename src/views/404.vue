<template>
  <div class="page-container flex flex-col justify-center">
    <div class="text-center">
      <SvgIcon iconName="icon-pic_date" className="largeSvg"/>
    </div>
    <div class="text-center">
      <h2>404</h2>
      <p>
        Sorry, the page you requested does not exist.
      </p>
      <div class="btn">
        <router-link :to="{ name: 'IndexPage' }" >
            <HappyButton text="Back Home" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .page-container {
  height: 100%;

  .text-center {
    text-align: center;
    h2 {
      margin: 0;
      font-size: 24px;
      color: #666;
      padding: 10px 0;
    }
    p {
      font-size: 14px;
      line-height: 2;
    }
    .largeSvg {
      width: 400px;
      height: 400px;
    }
    .btn {
      margin-top: 20px;
        a {
            display: inline-block;
            width: 120px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            font-size: 16px;
            border-radius: 6px;
            color: #fff;
            background-color: #EB9794;
        }
    }
  }

  img {
    width: 350px;
    margin: 0 auto;
  }
}
</style>