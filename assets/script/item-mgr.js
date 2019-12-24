import { _decorator, Component, Node ,AudioClip, Prefab, instantiate, math } from "cc";
const { ccclass, property } = _decorator;

@ccclass("itemmgr")
export class itemmgr extends Component {

    @property(AudioClip) 
    music = null;

    @property(Prefab)
    item = null;

    @property(Node)
    midSphere = null;

    onLoad () {
        console.log(this.music);
        const PI = 3.1415926;
        const R = 5;
        // 实例化 item
        for (let i = 0; i < 40; i++) {
            let item = instantiate(this.item);
            this.node.addChild(item);
            item.setPosition(R * Math.sin(i/40 * 2*PI), 0, R * Math.cos(i/40 * 2*PI));
        }
        // 处理不同平台
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    }

    onClick () {
        let AudioContext = window.AudioContext;
        // audioContext 只相当于一个容器。
        let audioContext = new AudioContext();
        // 要让 audioContext 真正丰富起来需要将实际的音乐信息传递给它的。
        // 也就是将 AudioBuffer 数据传递进去。
        // 以下就是创建音频资源节点管理者。
        this.audioBufferSourceNode = audioContext.createBufferSource();
        // 将 AudioBuffer 传递进去。
        this.audioBufferSourceNode.buffer = this.music._audio;
        // 创建分析器。
        this.analyser = audioContext.createAnalyser();
        // 精度设置
        this.analyser.fftSize = 256;
        // 在传到扬声器之前，连接到分析器。
        this.audioBufferSourceNode.connect(this.analyser);
        // 连接到扬声器。
        this.analyser.connect(audioContext.destination);
        // 开始播放
        this.audioBufferSourceNode.start(0);
    }

    onStop () {
        // 停止方法
        this.audioBufferSourceNode.stop();
    }

    update (dt) {
        // 等待准备好
        if (!this.analyser) return;
        // 建立数据准备接受数据
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        // 分析结果存入数组。
        this.analyser.getByteFrequencyData(this.dataArray);
        this.draw(this.dataArray);
    }

    draw (dataArray) {
        // console.log(dataArray);
        for (let i = 0; i < 40; i++) {
            let h = dataArray[i * 3] * 0.03;
            let pos = this.node.children[i].getPosition();
            h = math.lerp(h, pos.y, 0.4);
            this.node.children[i].setPosition(pos.x, h, pos.z);
        }
        let s = dataArray[4] * 0.03; 
        // console.log(s);
        if (s < 5) s = 5;
        this.midSphere.setScale(s, s, s);
    }
}
