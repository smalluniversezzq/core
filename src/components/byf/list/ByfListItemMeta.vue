<template>
  <a-list-item-meta v-bind="$attrs">
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <template slot="avatar">
      <slot name="avatar"></slot>
    </template>
    <template slot="default">
      <slot name="default"></slot>
    </template>
  </a-list-item-meta>
</template>