import Notification from './notification.vue';
import Vue from 'vue';

Notification.newInstance = properties => {
    const _props = properties || {};

    const Instance = new Vue({
        render (h) {
            return h(Notification, {
                props: _props
            });
        }
    });

    const component = Instance.$mount();
    const root = document.getElementById('content-host').shadowRoot?.querySelector('.content') || document.body
    root.appendChild(component.$el);
    const notification = Instance.$children[0];

    return {
        notice (noticeProps) {
            notification.add(noticeProps);
        },
        remove (name) {
            notification.close(name);
        },
        component: notification,
        destroy (element) {
            notification.closeAll();
            setTimeout(function() {
                root.removeChild(document.getElementsByClassName(element)[0]);
            }, 500);
        }
    };
};

export default Notification;
