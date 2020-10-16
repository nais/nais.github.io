# Make graph mimic previous one as closely as we care to bother with
set style line 1 \
    linecolor rgb '#0060ad' \
    linetype 1 linewidth 3 \
    pointtype 7 pointsize 1

set grid
set ytics 100
set offsets 0,2,0,0
set term png medium size 1080
set output '../../images/deployments_per_week_graph.png'
set key autotitle columnhead
plot "deploy_data.tsv" with linespoints linestyle 1 notitle
